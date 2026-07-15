#!/usr/bin/env python3
"""
MVP-006: Transform Scryfall Avatar JSON into the application data model.

Usage:
    python build-avatar-card-data.py \
        --source source-data/scryfall/avatar-cards.raw.json \
        --output-dir docs/cards

Generated files:
    avatar-cards.app.json
    avatar-cards.search-index.json
    avatar-cards.translation-queue.csv
    avatar-cards.review.csv
    avatar-cards.validation.json
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any


TYPE_WORDS = {
    "Artifact": "Artefakt",
    "Battle": "Bitwa",
    "Basic": "Podstawowy",
    "Creature": "Stworzenie",
    "Enchantment": "Urok",
    "Instant": "Czar natychmiastowy",
    "Kindred": "Plemię",
    "Land": "Ląd",
    "Legendary": "Legendarne",
    "Snow": "Śnieżny",
    "Sorcery": "Rytuał",
    "Token": "Żeton",
}

SUBTYPE_WORDS = {
    "Advisor": "Doradca",
    "Ally": "Sojusznik",
    "Ape": "Małpa",
    "Archer": "Łucznik",
    "Armadillo": "Pancernik",
    "Artificer": "Rzemieślnik",
    "Assassin": "Zabójca",
    "Aura": "Aura",
    "Avatar": "Avatar",
    "Badger": "Borsuk",
    "Bard": "Bard",
    "Bat": "Nietoperz",
    "Bear": "Niedźwiedź",
    "Beast": "Bestia",
    "Bird": "Ptak",
    "Bison": "Bizon",
    "Boar": "Dzik",
    "Cat": "Kot",
    "Cave": "Jaskinia",
    "Citizen": "Obywatel",
    "Cleric": "Kleryk",
    "Construct": "Konstrukt",
    "Crocodile": "Krokodyl",
    "Dog": "Pies",
    "Dragon": "Smok",
    "Druid": "Druid",
    "Elder": "Starszy",
    "Elephant": "Słoń",
    "Elf": "Elf",
    "Elk": "Jeleń",
    "Equipment": "Ekwipunek",
    "Fish": "Ryba",
    "Forest": "Las",
    "Fox": "Lis",
    "Frog": "Żaba",
    "Giant": "Olbrzym",
    "Goat": "Koza",
    "Goblin": "Goblin",
    "Hippo": "Hipopotam",
    "Horse": "Koń",
    "Human": "Człowiek",
    "Insect": "Owad",
    "Island": "Wyspa",
    "Kangaroo": "Kangur",
    "Lemur": "Lemur",
    "Lesson": "Lekcja",
    "Lizard": "Jaszczurka",
    "Mercenary": "Najemnik",
    "Mole": "Kret",
    "Mongoose": "Mangusta",
    "Monk": "Mnich",
    "Monkey": "Małpa",
    "Mountain": "Góra",
    "Noble": "Szlachcic",
    "Octopus": "Ośmiornica",
    "Otter": "Wydra",
    "Ox": "Wół",
    "Peasant": "Chłop",
    "Performer": "Artysta",
    "Pilot": "Pilot",
    "Pirate": "Pirat",
    "Plains": "Równina",
    "Plant": "Roślina",
    "Platypus": "Dziobak",
    "Porcupine": "Jeżozwierz",
    "Rabbit": "Królik",
    "Ranger": "Łowca",
    "Rat": "Szczur",
    "Rebel": "Buntownik",
    "Rhino": "Nosorożec",
    "Rogue": "Łotr",
    "Saga": "Saga",
    "Samurai": "Samuraj",
    "Scarecrow": "Strach na wróble",
    "Scout": "Zwiadowca",
    "Seal": "Foka",
    "Serpent": "Wąż morski",
    "Shaman": "Szaman",
    "Shapeshifter": "Zmiennokształtny",
    "Sheep": "Owca",
    "Shrine": "Sanktuarium",
    "Sloth": "Leniwiec",
    "Snake": "Wąż",
    "Soldier": "Żołnierz",
    "Spider": "Pająk",
    "Spirit": "Duch",
    "Squirrel": "Wiewiórka",
    "Starfish": "Rozgwiazda",
    "Swamp": "Bagno",
    "Turtle": "Żółw",
    "Vehicle": "Pojazd",
    "Wall": "Ściana",
    "Warlock": "Czarnoksiężnik",
    "Warrior": "Wojownik",
    "Whale": "Wieloryb",
    "Wizard": "Czarodziej",
    "Wolf": "Wilk",
}

KEYWORD_TO_GLOSSARY = {
    "Airbend": "airbend",
    "Deathtouch": "deathtouch",
    "Defender": "defender",
    "Double strike": "double-strike",
    "Earthbend": "earthbend",
    "Exhaust": "exhaust",
    "Firebending": "firebend",
    "First strike": "first-strike",
    "Flash": "flash",
    "Flying": "flying",
    "Haste": "haste",
    "Hexproof": "hexproof",
    "Indestructible": "indestructible",
    "Landfall": "landfall",
    "Lifelink": "lifelink",
    "Menace": "menace",
    "Prowess": "prowess",
    "Raid": "raid",
    "Reach": "reach",
    "Scry": "scry",
    "Surveil": "surveil",
    "Trample": "trample",
    "Vigilance": "vigilance",
    "Waterbend": "waterbend",
}

QUICK_START_PRINT_KEYS = {
    "tle:210", "tle:211", "tle:215", "tle:217", "tle:218",
    "tle:219", "tle:220", "tle:221", "tle:234", "tle:238",
    "tle:239", "tle:240", "tle:241", "tle:244", "tle:245",
    "tle:246", "tle:247", "tla:285",
}


def ascii_fold(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", text)
    return "".join(ch for ch in normalized if not unicodedata.combining(ch))


def normalize_search(text: str) -> str:
    text = ascii_fold(text).lower().strip()
    text = re.sub(r"[\s:_\-]+", " ", text)
    return re.sub(r"\s+", " ", text)


def collector_number_numeric(value: str) -> int | None:
    match = re.fullmatch(r"0*(\d+)", str(value))
    return int(match.group(1)) if match else None


def translate_words(part: str, mapping: dict[str, str]) -> str:
    tokens = re.split(r"(\s+)", part)
    output: list[str] = []

    for token in tokens:
        if not token or token.isspace():
            output.append(token)
            continue

        prefix_match = re.match(r"^\W*", token)
        suffix_match = re.search(r"\W*$", token)
        prefix = prefix_match.group(0) if prefix_match else ""
        suffix = suffix_match.group(0) if suffix_match else ""

        start = len(prefix)
        end = len(token) - len(suffix) if suffix else len(token)
        core = token[start:end]
        output.append(prefix + mapping.get(core, core) + suffix)

    return "".join(output)


def translate_type_line(type_line: str) -> str:
    translated_faces: list[str] = []

    for face in [part.strip() for part in type_line.split("//")]:
        if " — " in face:
            left, right = face.split(" — ", 1)
            translated_faces.append(
                f"{translate_words(left, TYPE_WORDS)} — "
                f"{translate_words(right, SUBTYPE_WORDS)}"
            )
        else:
            translated_faces.append(translate_words(face, TYPE_WORDS))

    return " // ".join(translated_faces)


def build(source_path: Path, output_dir: Path) -> None:
    cards_raw = json.loads(source_path.read_text(encoding="utf-8"))

    if not isinstance(cards_raw, list):
        raise ValueError("Źródłowy JSON musi zawierać listę kart.")
    if len(cards_raw) != 524:
        raise ValueError(
            f"Oczekiwano 524 rekordów, otrzymano {len(cards_raw)}."
        )

    output_dir.mkdir(parents=True, exist_ok=True)

    app_cards: list[dict[str, Any]] = []
    search_index: list[dict[str, Any]] = []
    translation_queue: list[dict[str, Any]] = []

    set_counts: Counter[str] = Counter()
    layout_counts: Counter[str] = Counter()
    unknown_type_words: Counter[str] = Counter()
    unknown_subtypes: Counter[str] = Counter()

    for card in cards_raw:
        set_code = card["set"].upper()
        collector = str(card["collector_number"])
        print_key = f"{card['set']}:{collector}"
        layout = card.get("layout", "normal")

        set_counts[set_code] += 1
        layout_counts[layout] += 1

        raw_faces = card.get("card_faces") or []
        source_faces = raw_faces if raw_faces else [card]
        faces: list[dict[str, Any]] = []

        for face_index, face in enumerate(source_faces):
            source_type = face.get("type_line", "")
            source_text = face.get("oracle_text", "")
            face_name = face.get("name", card["name"])

            glossary_ids = sorted({
                KEYWORD_TO_GLOSSARY[keyword]
                for keyword in card.get("keywords", [])
                if keyword in KEYWORD_TO_GLOSSARY
            })

            faces.append({
                "faceIndex": face_index,
                "name": face_name,
                "manaCost": face.get("mana_cost", ""),
                "typeLineSource": source_type,
                "typeLinePl": translate_type_line(source_type),
                "rulesTextSource": source_text,
                "rulesTextPlPlain": None,
                "rulesTextParts": [],
                "power": face.get("power"),
                "toughness": face.get("toughness"),
                "loyalty": face.get("loyalty"),
                "defense": face.get("defense"),
                "glossaryTermIds": glossary_ids,
            })

            if source_text:
                translation_queue.append({
                    "printKey": print_key,
                    "cardName": card["name"],
                    "faceIndex": face_index,
                    "faceName": face_name,
                    "layout": layout,
                    "typeLineSource": source_type,
                    "rulesTextSource": source_text,
                    "status": "todo",
                    "priority": (
                        "high"
                        if print_key in QUICK_START_PRINT_KEYS
                        else "normal"
                    ),
                    "notes": "",
                })

            for face_part in source_type.split("//"):
                face_part = face_part.strip()
                if " — " in face_part:
                    left, right = face_part.split(" — ", 1)
                else:
                    left, right = face_part, ""

                for token in re.findall(r"[A-Za-z]+", left):
                    if token not in TYPE_WORDS:
                        unknown_type_words[token] += 1

                for token in re.findall(r"[A-Za-z]+", right):
                    if token not in SUBTYPE_WORDS:
                        unknown_subtypes[token] += 1

        numeric_collector = collector_number_numeric(collector)

        record = {
            "cardId": card["id"],
            "oracleId": card.get("oracle_id"),
            "printKey": print_key,
            "name": card["name"],
            "setCode": set_code,
            "setName": card.get("set_name"),
            "collectorNumber": collector,
            "collectorNumberNumeric": numeric_collector,
            "layout": layout,
            "manaValue": card.get("cmc"),
            "faces": faces,
            "sourceKeywords": card.get("keywords", []),
            "colors": card.get("colors", []),
            "colorIdentity": card.get("color_identity", []),
            "rarity": card.get("rarity"),
            "isToken": (
                card.get("set_type") == "token"
                or "Token" in card.get("type_line", "")
            ),
            "search": {
                "normalizedName": normalize_search(card["name"]),
                "normalizedFaceNames": [
                    normalize_search(face["name"]) for face in faces
                ],
                "normalizedCollectorNumber": (
                    str(numeric_collector)
                    if numeric_collector is not None
                    else normalize_search(collector)
                ),
                "normalizedSetCode": set_code.lower(),
                "normalizedFullCode": (
                    f"{set_code.lower()} "
                    f"{numeric_collector if numeric_collector is not None else normalize_search(collector)}"
                ),
            },
            "translationStatus": {
                "typeLinePl": "ready",
                "rulesTextPl": (
                    "not-started"
                    if any(face["rulesTextSource"] for face in faces)
                    else "not-required"
                ),
                "explanationPl": "not-started",
            },
        }

        app_cards.append(record)
        search_index.append({
            "printKey": print_key,
            "name": card["name"],
            "faceNames": [face["name"] for face in faces],
            "setCode": set_code,
            "collectorNumber": collector,
            "collectorNumberNumeric": numeric_collector,
            "normalizedName": record["search"]["normalizedName"],
            "normalizedFaceNames": record["search"]["normalizedFaceNames"],
            "normalizedSetCode": record["search"]["normalizedSetCode"],
            "normalizedFullCode": record["search"]["normalizedFullCode"],
        })

    app_cards.sort(
        key=lambda card: (
            card["setCode"],
            card["collectorNumberNumeric"]
            if card["collectorNumberNumeric"] is not None
            else 10**9,
            card["collectorNumber"],
            card["name"],
        )
    )
    search_index.sort(
        key=lambda card: (
            card["name"].casefold(),
            card["setCode"],
            card["collectorNumberNumeric"]
            if card["collectorNumberNumeric"] is not None
            else 10**9,
        )
    )
    translation_queue.sort(
        key=lambda row: (
            0 if row["priority"] == "high" else 1,
            row["cardName"].casefold(),
            row["faceIndex"],
        )
    )

    print_keys = [card["printKey"] for card in app_cards]
    card_ids = [card["cardId"] for card in app_cards]
    oracle_ids = [
        card["oracleId"] for card in app_cards if card["oracleId"]
    ]

    duplicate_print_keys = [
        value for value, count in Counter(print_keys).items() if count > 1
    ]
    duplicate_card_ids = [
        value for value, count in Counter(card_ids).items() if count > 1
    ]
    duplicate_oracle_ids = [
        value for value, count in Counter(oracle_ids).items() if count > 1
    ]

    collector_sets: defaultdict[str, set[str]] = defaultdict(set)
    for card in app_cards:
        collector_sets[card["collectorNumber"]].add(card["setCode"])

    shared_collectors = sorted(
        collector
        for collector, sets in collector_sets.items()
        if len(sets) > 1
    )

    validation = {
        "sourceRecordCount": len(cards_raw),
        "appRecordCount": len(app_cards),
        "setCounts": dict(set_counts),
        "layoutCounts": dict(layout_counts),
        "multiFaceCards": sum(
            1 for card in app_cards if len(card["faces"]) > 1
        ),
        "cardsWithoutRulesText": sum(
            1
            for card in app_cards
            if not any(face["rulesTextSource"] for face in card["faces"])
        ),
        "translationQueueRows": len(translation_queue),
        "duplicatePrintKeys": duplicate_print_keys,
        "duplicateCardIds": duplicate_card_ids,
        "duplicateOracleIds": duplicate_oracle_ids,
        "collectorNumbersSharedAcrossSets": len(shared_collectors),
        "allPrintKeysUnique": not duplicate_print_keys,
        "allCardIdsUnique": not duplicate_card_ids,
        "allRecordsHaveName": all(bool(card["name"]) for card in app_cards),
        "allRecordsHaveSetCode": all(
            card["setCode"] in {"TLA", "TLE"} for card in app_cards
        ),
        "allRecordsHaveCollectorNumber": all(
            bool(card["collectorNumber"]) for card in app_cards
        ),
        "allRecordsHaveAtLeastOneFace": all(
            bool(card["faces"]) for card in app_cards
        ),
        "allTypeLinesTranslated": all(
            bool(face["typeLinePl"])
            for card in app_cards
            for face in card["faces"]
        ),
        "unknownTypeWords": dict(unknown_type_words),
        "unknownSubtypes": dict(unknown_subtypes),
    }

    (output_dir / "avatar-cards.app.json").write_text(
        json.dumps({
            "id": "avatar-mtg-cards",
            "version": "1.0",
            "recordCount": len(app_cards),
            "source": source_path.name,
            "records": app_cards,
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    (output_dir / "avatar-cards.search-index.json").write_text(
        json.dumps({
            "id": "avatar-mtg-card-search-index",
            "version": "1.0",
            "recordCount": len(search_index),
            "records": search_index,
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    with (output_dir / "avatar-cards.translation-queue.csv").open(
        "w", encoding="utf-8-sig", newline=""
    ) as file:
        writer = csv.DictWriter(file, fieldnames=[
            "printKey",
            "cardName",
            "faceIndex",
            "faceName",
            "layout",
            "typeLineSource",
            "rulesTextSource",
            "status",
            "priority",
            "notes",
        ])
        writer.writeheader()
        writer.writerows(translation_queue)

    with (output_dir / "avatar-cards.review.csv").open(
        "w", encoding="utf-8-sig", newline=""
    ) as file:
        writer = csv.writer(file)
        writer.writerow([
            "print_key",
            "name",
            "set_code",
            "collector_number",
            "layout",
            "face_count",
            "type_line_source",
            "type_line_pl",
            "has_rules_text",
            "rules_translation_status",
            "explanation_status",
        ])

        for card in app_cards:
            writer.writerow([
                card["printKey"],
                card["name"],
                card["setCode"],
                card["collectorNumber"],
                card["layout"],
                len(card["faces"]),
                " // ".join(
                    face["typeLineSource"] for face in card["faces"]
                ),
                " // ".join(
                    face["typeLinePl"] for face in card["faces"]
                ),
                (
                    "yes"
                    if any(
                        face["rulesTextSource"] for face in card["faces"]
                    )
                    else "no"
                ),
                card["translationStatus"]["rulesTextPl"],
                card["translationStatus"]["explanationPl"],
            ])

    (output_dir / "avatar-cards.validation.json").write_text(
        json.dumps(validation, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    if duplicate_print_keys or duplicate_card_ids:
        raise ValueError(
            "Walidacja nie powiodła się: wykryto duplikaty identyfikatorów."
        )
    if unknown_type_words or unknown_subtypes:
        raise ValueError(
            "Walidacja nie powiodła się: nieprzetłumaczone typy lub podtypy."
        )

    print(f"Wygenerowano {len(app_cards)} rekordy kart.")
    print(f"Kolejka tłumaczeń: {len(translation_queue)} wierszy.")
    print(f"Wspólne numery TLA/TLE: {len(shared_collectors)}.")
    print("Walidacja zakończona powodzeniem.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("source-data/scryfall/avatar-cards.raw.json"),
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("docs/cards"),
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    build(args.source, args.output_dir)


if __name__ == "__main__":
    main()

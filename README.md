# Journey D20 (tidigare Astro Inferno D20)

A journey experience system built upon storytelling. A simple way to create an epic record of the player's epic (and painful) odyssey.

## Features

- **D20-based system** with Forms (Races) and Destinies (Classes)
- **Story Points system** for narrative control and dramatic moments
- **Simple character creation** with intuitive attribute system
- **Focus on storytelling** and character development
- **Fully compatible** with Foundry VTT v13

## System Overview

### Character Creation
- Six core attributes: Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma
- Forms represent character races/species with unique abilities and traits
- Destinies represent character classes/professions with progressive features
- Story Points for enhancing rolls and narrative control

### Story Points
- Gain story points through exceptional play (natural 20s)
- Spend points to enhance rolls or trigger narrative effects
- Integrated chat messages for story point transactions

### Items
- **Forms**: Character races with attribute bonuses and special abilities
- **Destinies**: Character classes with level-based progression and features

## Installation

### Option 1: Install from URL
1. In Foundry VTT, navigate to the "Add-on Modules" tab
2. Click "Install System"
3. Enter the following URL: `https://github.com/dustiekaltman/journey-foundryvtt/releases/latest/download/system.json`
4. Click "Install"

### Option 2: Local Installation (Recommended for Development)
1. Clone or download this repository
2. Copy the entire folder to your Foundry's systems directory:
   - macOS: `~/Library/Application Support/FoundryVTT/Data/systems/`
   - Windows: `%appdata%/FoundryVTT/Data/systems/`
   - Linux: `~/.local/share/FoundryVTT/Data/systems/`
3. Rename the folder to `journey-foundryvtt`
4. Restart Foundry VTT

### Option 3: Symbolic Link (Best for Development)
```bash
ln -s /path/to/your/journey-foundryvtt ~/Library/Application\ Support/FoundryVTT/Data/systems/journey-foundryvtt
```

## System Requirements

- Foundry VTT version 13 or higher
- A modern web browser

## Development

### Project Structure
```
journey-foundryvtt/
├── scripts/
│   ├── mysystem.mjs        # Main system initialization
│   ├── actor/
│   │   └── character.js    # Character Actor class
│   ├── items/
│   │   ├── form.js        # Form Item class
│   │   └── destiny.js     # Destiny Item class
│   ├── sheets/
│   │   ├── character-sheet.js  # Character sheet implementation
│   │   ├── form-sheet.js       # Form sheet implementation
│   │   └── destiny-sheet.js    # Destiny sheet implementation
│   └── dice/
│       └── story-points.js # Story points system
├── templates/
│   ├── actor/
│   │   └── character-sheet.html
│   ├── items/
│   │   ├── form-sheet.html
│   │   └── destiny-sheet.html
│   └── chat/
│       ├── story-point.html
│       └── story-point-spent.html
├── styles/
│   ├── system.css         # Core system styles
│   └── character-sheet.css # Character sheet specific styles
├── lang/
│   └── en.json           # English translations
├── packs/                # Compendium packs
└── system.json          # System manifest
```

### Key Components

- **AstroInfernoCharacter**: Extended Actor class for player characters
- **AstroInfernoForm**: Item subclass for character races
- **AstroInfernoDestiny**: Item subclass for character classes
- **CharacterSheet**: ActorSheet implementation for character sheets
- **FormSheet/DestinySheet**: ItemSheet implementations
- **StoryPoints**: System for narrative control mechanics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow existing code style and conventions
- Test changes in Foundry VTT v13
- Update documentation for new features
- Submit clear, focused pull requests

## Support

For support, please open an issue on the GitHub repository.

## Credits

Created by Dustie Kaltman

Special thanks to the Foundry VTT community for their support and guidance.
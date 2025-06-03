// Import document classes
import { AstroInfernoCharacter } from './actor/character.js';
import { AstroInfernoForm } from './items/form.js';
import { AstroInfernoDestiny } from './items/destiny.js';
import { StoryPoints } from './dice/story-points.js';

// Import sheet classes
import { CharacterSheet } from './sheets/character-sheet.js';
import { FormSheet } from './sheets/form-sheet.js';
import { DestinySheet } from './sheets/destiny-sheet.js';

// System initialization
Hooks.once('init', async function() {
    console.log('Journey | Initializing Journey D20 System');

    // Define custom document classes
    CONFIG.Actor.documentClass = AstroInfernoCharacter;
    
    // Register custom Item subclasses for v13
    CONFIG.Item.documentClass = class extends Item {
        static get implementation() {
            const types = {
                form: AstroInfernoForm,
                destiny: AstroInfernoDestiny
            };
            return types[this.type] || this;
        }
    };

    // Register sheet classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("journey-foundryvtt", CharacterSheet, {
        types: ["character"],
        makeDefault: true,
        label: "ASTRO.CharacterSheet"
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("journey-foundryvtt", FormSheet, {
        types: ["form"],
        makeDefault: true,
        label: "ASTRO.FormSheet"
    });
    
    Items.registerSheet("journey-foundryvtt", DestinySheet, {
        types: ["destiny"],
        makeDefault: true,
        label: "ASTRO.DestinySheet"
    });

    // Register system settings
    game.settings.register('journey-foundryvtt', 'defaultStoryPoints', {
        name: 'ASTRO.Settings.DefaultStoryPoints',
        hint: 'ASTRO.Settings.DefaultStoryPointsHint',
        scope: 'world',
        config: true,
        type: Number,
        default: 3
    });

    // Define system document types
    CONFIG.Actor.typeLabels = {
        character: "ASTRO.ActorType.Character"
    };

    CONFIG.Item.typeLabels = {
        form: "ASTRO.ItemType.Form",
        destiny: "ASTRO.ItemType.Destiny"
    };

    // Preload Handlebars templates
    const templatePaths = [
        "systems/journey-foundryvtt/templates/actor/character-sheet.html",
        "systems/journey-foundryvtt/templates/items/form-sheet.html",
        "systems/journey-foundryvtt/templates/items/destiny-sheet.html",
        "systems/journey-foundryvtt/templates/chat/story-point.html",
        "systems/journey-foundryvtt/templates/chat/story-point-spent.html"
    ];
    
    await loadTemplates(templatePaths);

    // Register Handlebars helpers
    Handlebars.registerHelper('ne', function(a, b) {
        return a !== b;
    });

    Handlebars.registerHelper('eq', function(a, b) {
        return a === b;
    });

    Handlebars.registerHelper('gt', function(a, b) {
        return a > b;
    });

    Handlebars.registerHelper('gte', function(a, b) {
        return a >= b;
    });

    Handlebars.registerHelper('lt', function(a, b) {
        return a < b;
    });

    Handlebars.registerHelper('lte', function(a, b) {
        return a <= b;
    });

    // Initialize story points system
    StoryPoints.init();
});

// Ready hook
Hooks.once('ready', async function() {
    console.log('Journey | System Ready');
});

// Export for use in other modules
export {
    AstroInfernoCharacter,
    AstroInfernoForm,
    AstroInfernoDestiny,
    StoryPoints,
    CharacterSheet,
    FormSheet,
    DestinySheet
};
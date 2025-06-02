// Import system components
import { Character } from './actor/character.js';
import { Form } from './items/form.js';
import { Destiny } from './items/destiny.js';
import { StoryPoints } from './dice/story-points.js';

// System initialization
Hooks.once('init', async function() {
    console.log('Initializing Astro Inferno D20 System');

    // Register system settings
    game.settings.register('astro-inferno', 'defaultStoryPoints', {
        name: 'Default Story Points',
        hint: 'The default number of story points characters start with',
        scope: 'world',
        config: true,
        type: Number,
        default: 3
    });

    // Register document classes
    CONFIG.Actor.documentClass = Character;
    CONFIG.Item.documentClass = Item;

    // Register system document types
    CONFIG.Actor.typeLabels = {
        character: "ASTRO.Character"
    };

    CONFIG.Item.typeLabels = {
        form: "ASTRO.Form",
        destiny: "ASTRO.Destiny"
    };

    // Register system templates
    const templatePaths = [
        "templates/actor/character-sheet.html",
        "templates/items/form-sheet.html",
        "templates/items/destiny-sheet.html",
        "templates/chat/story-point.html",
        "templates/chat/story-point-spent.html"
    ];

    loadTemplates(templatePaths);

    // Initialize the story points system
    StoryPoints.init();
});

// Register system-specific hooks
Hooks.on('renderActorSheet', (app, html, data) => {
    // Add system-specific UI elements to actor sheets
});

Hooks.on('renderItemSheet', (app, html, data) => {
    // Add system-specific UI elements to item sheets
});

// Export system components
export {
    Character,
    Form,
    Destiny,
    StoryPoints
}; 
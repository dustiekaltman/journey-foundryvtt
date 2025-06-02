/**
 * Astro Inferno D20 System
 */
export class AstroInfernoSystem {
    static async init() {
        // Register system settings
        this.registerSettings();

        // Register system document classes
        this.registerDocuments();

        // Register system templates
        this.registerTemplates();

        // Initialize the story points system
        await import('./dice/story-points.js').then(module => {
            module.StoryPoints.init();
        });
    }

    /**
     * Register system settings
     */
    static registerSettings() {
        // Register system settings here
        game.settings.register('astro-inferno', 'defaultStoryPoints', {
            name: 'Default Story Points',
            hint: 'The default number of story points characters start with',
            scope: 'world',
            config: true,
            type: Number,
            default: 3
        });
    }

    /**
     * Register system document classes
     */
    static registerDocuments() {
        // Register Actor types
        CONFIG.Actor.documentClass = Character;
        CONFIG.Actor.typeLabels = {
            character: "ASTRO.Character"
        };

        // Register Item types
        CONFIG.Item.documentClass = Item;
        CONFIG.Item.typeLabels = {
            form: "ASTRO.Form",
            destiny: "ASTRO.Destiny"
        };
    }

    /**
     * Register system templates
     */
    static registerTemplates() {
        // Register system templates
        const templatePaths = [
            "templates/actor/character-sheet.html",
            "templates/items/form-sheet.html",
            "templates/items/destiny-sheet.html",
            "templates/chat/story-point.html",
            "templates/chat/story-point-spent.html"
        ];

        loadTemplates(templatePaths);
    }
}

// Initialize the system when the game is ready
Hooks.once('init', async function() {
    await AstroInfernoSystem.init();
});

// Register system-specific hooks
Hooks.on('renderActorSheet', (app, html, data) => {
    // Add system-specific UI elements to actor sheets
});

Hooks.on('renderItemSheet', (app, html, data) => {
    // Add system-specific UI elements to item sheets
}); 
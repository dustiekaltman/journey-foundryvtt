/**
 * Main module class
 */
class YourModule {
    constructor() {
        this.id = 'your-module-name';
        this.name = 'Your Module Title';
    }

    /**
     * Initialize the module
     */
    async init() {
        // Register module settings
        this.registerSettings();

        // Register hooks
        this.registerHooks();

        // Initialize any other module features
        this.initializeFeatures();
    }

    /**
     * Register module settings
     */
    registerSettings() {
        // Example setting
        game.settings.register(this.id, 'exampleSetting', {
            name: 'Example Setting',
            hint: 'This is an example setting',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true
        });
    }

    /**
     * Register module hooks
     */
    registerHooks() {
        // Example hook
        Hooks.on('ready', () => {
            console.log(`${this.name} | Module initialized`);
        });
    }

    /**
     * Initialize module features
     */
    initializeFeatures() {
        // Add your feature initialization code here
    }
}

// Initialize the module when the game is ready
Hooks.once('init', () => {
    window.yourModule = new YourModule();
    window.yourModule.init();
}); 
/**
 * A Singleton <code>IController</code> implementation.
 *
 * <P>
 * In PureMVC, the <code>Controller</code> class follows the
 * 'Command and Controller' strategy, and assumes these
 * responsibilities:</P>
 * <UL>
 * <LI> Remembering which <code>ICommand</code>s
 * are intended to handle which <code>INotifications</code>.</LI>
 * <LI> Registering itself as an <code>IObserver</code> with
 * the <code>View</code> for each <code>INotification</code>
 * that it has an <code>ICommand</code> mapping for.</LI>
 * <LI> Creating a new instance of the proper <code>ICommand</code>
 * to handle a given <code>INotification</code> when notified by the <code>View</code>.</LI>
 * <LI> Calling the <code>ICommand</code>'s <code>execute</code>
 * method, passing in the <code>INotification</code>.</LI>
 * </UL>
 *
 * <P>
 * Your application must register <code>ICommands</code> with the
 * Controller.</P>
 * <P>
 * The simplest way is to subclass <code>Facade</code>,
 * and use its <code>initializeController</code> method to add your
 * registrations. </P>
 *
 * @see mvc.core.view.View View
 * @see mvc.patterns.observer.Observer Observer
 * @see mvc.patterns.observer.Notification Notification
 * @see mvc.patterns.command.SimpleCommand SimpleCommand
 * @see mvc.patterns.command.MacroCommand MacroCommand
 */
qx.Class.define("mvc.core.Controller", {
//    type: "singleton",
    extend: qx.core.Object,
    implement : mvc.interfaces.IController,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        _instance:null,
        getInstance:function() {
            if (this._instance == null) {
                this._instance = new this();
            }
            return this._instance;
        },

        removeInstance:function() {
            if (this._instance) {
                this._instance.dispose();
                this._instance = null;
            }
        }
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */

    /**
     * Constructor.
     *
     * <P>
     * This <code>IController</code> implementation is a Singleton,
     * so you should not call the constructor
     * directly, but instead call the static Singleton
     * Factory method <code>Controller.getInstance()</code></P>
     *
     */
    construct: function() {
        this.base(arguments);

        this._commandMap = {};
        this._initializeController();
    },

    /*
     *****************************************************************************
     EVENTS
     *****************************************************************************
     */
    events: {
    },

    /*
     *****************************************************************************
     PROPERTY
     *****************************************************************************
     */
    properties: {
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        _commandMap:null,
        _view:null,

        /**
         * Initialize the Singleton <code>Controller</code> instance.
         *
         * <P>Called automatically by the constructor.</P>
         *
         * <P>Note that if you are using a subclass of <code>View</code>
         * in your application, you should <i>also</i> subclass <code>Controller</code>
         * and override the <code>initializeController</code> method in the
         * following way:</P>
         *
         * <listing>
         *                // ensure that the Controller is talking to my IView implementation
         *                override public function initializeController(  ) : void
         *                {
         *                        view = MyView.getInstance();
         *                }
         * </listing>
         *
         * @return {void}
         */
        _initializeController:function() {
            this._view = mvc.core.View.getInstance();
        },

        /**
         * If a SimpleCommand or MacroCommand has previously been registered to handle
         * the given Notification then it is executed.
         *
         * @param notification {mvc.interfaces.INotification}
         * @return {void}
         */
        executeCommand:function ( notification ) {
            var commandClassRef = this._commandMap[ notification.getNotificationName() ];

            if (!commandClassRef) {
                return;
            }

            var commandInstance = new commandClassRef();
            commandInstance.execute( notification );
            commandInstance.dispose();
        },

        /**
         * Register a particular SimpleCommand or MacroCommand class as the handler for
         * a particular Notification.
         *
         * If an command already been registered to handle Notifications with this name,
         * it is no longer used, the new command is used instead.
         *
         * The Observer for the new command is only created if this the irst time a
         * command has been regisered for this Notification name.
         *
         * @param notificationName {String}
         *  the name of the Notification
         * @param commandClassRef {Class}
         *  a command constructor
         * @return {void}
         */
        registerCommand:function (notificationName, commandClassRef) {
            if (!this._commandMap[ notificationName ]) {
                this._view.registerObserver(notificationName, new mvc.patterns.observer.Observer(this.executeCommand, this));
            }

            this._commandMap[notificationName] = commandClassRef;
        },

        /**
         * Check if a command is registered for a given Notification
         *
         * @param notificationName {String}
         * @return {Booean}
         *  whether a Command is currently registered for the given notificationName.
         */
        hasCommand:function( notificationName ) {
            return this._commandMap[ notificationName ] != null;
        },

        /**
         * Remove a previously registered command to
         * {@link puremvc.Notification Notification}
         * mapping.
         *
         * @param notificationName {String}
         *  the name of the Notification to remove the command mapping for
         * @return {void}
         */
        removeCommand: function( notificationName ) {
            // if the Command is registered...
            if ( this.hasCommand( notificationName ) ) {
                // remove the observer
                this._view.removeObserver( notificationName, this );

                // remove the command
                this._commandMap[ notificationName ] = null;
                delete this._commandMap[ notificationName ];
            }
        }
    },

    destruct: function () {
        for (var name in this._commandMap) {
            this._commandMap[name] = null;
            delete this._commandMap[name];
        }
    }
});
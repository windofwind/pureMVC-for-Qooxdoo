/*
 * Created by Wind on 1/28/14.
 */

/**
 * A Base <code>INotifier</code> implementation.
 *
 * <P>
 * <code>MacroCommand, Command, Mediator</code> and <code>Proxy</code>
 * all have a need to send <code>Notifications</code>. </P>
 * <P>
 * The <code>INotifier</code> interface provides a common method called
 * <code>sendNotification</code> that relieves implementation code of
 * the necessity to actually construct <code>Notifications</code>.</P>
 *
 * <P>
 * The <code>Notifier</code> class, which all of the above mentioned classes
 * extend, provides an initialized reference to the <code>Facade</code>
 * Singleton, which is required for the convienience method
 * for sending <code>Notifications</code>, but also eases implementation as these
 * classes have frequent <code>Facade</code> interactions and usually require
 * access to the facade anyway.</P>
 *
 * @see mvc.patterns.Facade Facade
 * @see mvc.patterns.Mediator Mediator
 * @see mvc.patterns.Proxy Proxy
 * @see mvc.patterns.command.SimpleCommand SimpleCommand
 * @see mvc.patterns.command.MacroCommand MacroCommand
 */
qx.Class.define("mvc.patterns.observer.Notifier", {
    extend: qx.core.Object,
    implement: [
        mvc.interfaces.INotification
    ],

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
    asdasdasdasdasd *****************************************************************************
     */
    construct: function () {
        this.base(arguments);
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
        /**
         * the name of the <code>Notification</code> instance.
         */
        notificationName: {
            dereference: true,
            nullable: false,
            init: "",
            check: "String"
        },

        /**
         * the body of the <code>Notification</code> instance.
         */
        body: {
            dereference: true,
            init: null,
            check: "Object"
        },

        /**
         * the type of the <code>Notification</code> instance.
         */
        type: {
            dereference: true,
            nullable: false,
            init: "",
            check: "String"
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        _facade: mvc.patterns.Facade.getInstance(),
        /**
         * Create and send an <code>INotification</code>.
         *
         * <P>
         * Keeps us from having to construct new INotification
         * instances in our implementation code.</P>
         * @param notificationName {String} the name of the notiification to send
         * @param body {Object} the body of the notification (optional)
         * @param type {String} the type of the notification (optional)
         */
        sendNotification: function (notificationName, body, type) {
            this._facade.sendNotification(notificationName, body, type);
        }
    },

    destruct: function () {
    }
});
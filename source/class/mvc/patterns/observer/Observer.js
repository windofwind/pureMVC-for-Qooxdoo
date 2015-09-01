/*
 * Created by Wind on 1/28/14.
 */

/**
 * A base <code>IObserver</code> implementation.
 *
 * <P>
 * An <code>Observer</code> is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular <code>INotification</code> is broadcast. </P>
 *
 * <P>
 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
 * <UL>
 * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
 * <LI>Encapsulate the notification context (this) of the interested object.</LI>
 * <LI>Provide methods for setting the notification method and context.</LI>
 * <LI>Provide a method for notifying the interested object.</LI>
 * </UL></P>
 *
 * @see mvc.core.view.View View
 * @see mvc.patterns.observer.Notification Notification
 */
qx.Class.define("mvc.patterns.observer.Observer", {
    extend: qx.core.Object,
    implement : [
        mvc.interfaces.IObserver
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
     *****************************************************************************
     */

    /**
     * Constructor.
     *
     * <P>
     * The notification method on the interested object should take
     * one parameter of type <code>INotification</code></P>
     *
     * @param notifyMethod {Function} the notification method of the interested object
     * @param notifyContext {Object} the notification context of the interested object
     */
    construct: function (notifyMethod, notifyContext) {
        this.base(arguments, notifyMethod, notifyContext);

        if (notifyMethod) {
            this.setNotifyMethod( notifyMethod );
        }

        if (notifyContext) {
            this.setNotifyContext( notifyContext );
        }
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
        notifyMethod:{
            check:"Function"
        },

        notifyContext:{
            init:null,
            check:"Object"
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Notify the interested object.
         *
         * @param notification {mvc.interfaces.INotification} the <code>INotification</code> to pass to the interested object's notification method.
         */
        notifyObserver:function(notification) {
            this.getNotifyMethod().apply(this.getNotifyContext(),[notification]);
        },

        /**
         * Compare an object to the notification context.
         *
         * @param object {Object} the object to compare
         * @return {Boolean} boolean indicating if the object and the notification context are the same
         */
        compareNotifyContext:function(object) {
            return object === this.getNotifyContext();
        },

        toString:function() {
            var msg = this.classname + "[" + this.$$hash + "]" ;
            msg += "\nNotifyContext : " + (this.getNotifyContext().classname);

            return msg;
        }
    },

    destruct: function () {
        this.getNotifyContext();
    }
});
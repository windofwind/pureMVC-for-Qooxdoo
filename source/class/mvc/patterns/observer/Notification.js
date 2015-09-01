/*
 * Created by Wind on 1/28/14.
 */

/**
 * A base <code>INotification</code> implementation.
 *
 * <P>
 * PureMVC does not rely upon underlying event models such
 * as the one provided with Flash, and ActionScript 3 does
 * not have an inherent event model.</P>
 *
 * <P>
 * The Observer Pattern as implemented within PureMVC exists
 * to support event-driven communication between the
 * application and the actors of the MVC triad.</P>
 *
 * <P>
 * Notifications are not meant to be a replacement for Events
 * in Flex/Flash/Apollo. Generally, <code>IMediator</code> implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of <code>Notification</code>s to
 * trigger <code>ICommand</code>s or to communicate with other <code>IMediators</code>. <code>IProxy</code> and <code>ICommand</code>
 * instances communicate with each other and <code>IMediator</code>s
 * by broadcasting <code>INotification</code>s.</P>
 *
 * <P>
 * A key difference between Flash <code>Event</code>s and PureMVC
 * <code>Notification</code>s is that <code>Event</code>s follow the
 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
 * until some parent component handles the <code>Event</code>, while
 * PureMVC <code>Notification</code>s follow a 'Publish/Subscribe'
 * pattern. PureMVC classes need not be related to each other in a
 * parent/child relationship in order to communicate with one another
 * using <code>Notification</code>s.</P>
 *
 * @see mvc.patterns.observer.Observer Observer
 *
 */
qx.Class.define("mvc.patterns.observer.Notification", {
    extend: qx.core.Object,
    implement : [
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
     *****************************************************************************
     */
    /**
     * Constructor.
     *
     * @param notificationName {String} of the <code>Notification</code> instance. (required)
     * @param body {Object} the <code>Notification</code> body. (optional)
     * @param type {String} the type of the <code>Notification</code> (optional)
     */
    construct: function (notificationName, body, type) {
        this.base(arguments);

        if (notificationName) {
            this.setNotificationName(notificationName);
        }

        if (body) {
            this.setBody(body);
        }

        if (type) {
            this.setType(type);
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
        /**
         * the name of the <code>Notification</code> instance.
         */
        notificationName:{
            nullable:false,
            init:"",
            check:"String"
        },

        /**
         * the body of the <code>Notification</code> instance.
         */
        body:{
            dereference:true,
            nullable:true,
            init:null,
            check:"Object"
        },

        /**
         * the type of the <code>Notification</code> instance.
         */
        type:{
            nullable:true,
            init:"",
            check:"String"
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Get the string representation of the <code>Notification</code> instance.
         *
         * @return {String} the string representation of the <code>Notification</code> instance.
         */
        toString:function() {
            var msg = "Notification Name: " + this.getNotificationName();
            msg += "\nBody:"+( ( this.getBody() == null )?"null":this.getBody.toString() );
            msg += "\nType:"+( ( this.getType() == null )?"null":this.getType() );
            return msg;
        }
    },

    destruct: function () {

    }
});
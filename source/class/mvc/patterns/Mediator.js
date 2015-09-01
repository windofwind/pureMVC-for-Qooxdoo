/*
 * Created by Wind on 1/28/14.
 */

/**
 * A base <code>IMediator</code> implementation.
 *
 * @see org.puremvc.as3.core.view.View View
 */

qx.Class.define("mvc.patterns.Mediator", {
    extend: mvc.patterns.observer.Notifier,
    implement : [
        mvc.interfaces.IMediator,
        mvc.interfaces.INotifier
    ],

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        NAME:"Mediator"
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    /**
     * The name of the <code>Mediator</code>.
     *
     * <P>
     * Typically, a <code>Mediator</code> will be written to serve
     * one specific control or group controls and so,
     * will not have a need to be dynamically named.</P>
     * @param mediatorName {String}
     * @param viewComponent {Object}
     */
    construct: function (mediatorName, viewComponent) {
        this.base(arguments);

        if (mediatorName) {
            this.setMediatorName(mediatorName);
        }

        if (viewComponent) {
            this.setViewComponent(viewComponent);
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
         * The name of the <code>Mediator</code>.
         */
        mediatorName:{
            nullable:false,
            init:"",
            check:"String"
        },

        /**
         * the <code>Mediator</code>'s view component.
         */
        viewComponent: {
            init:null,
            check:"Object",
            event:"addViewComponent"
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * List the <code>INotification</code> names this
         * <code>Mediator</code> is interested in being notified of.
         *
         * @return {Array} the list of <code>INotification</code> names
         */
        listNotificationInterests:function() {
            return [
            ];
        },

        /**
         * Handle <code>INotification</code>s.
         *
         * <P>
         * Typically this will be handled in a switch statement,
         * with one 'case' entry per <code>INotification</code>
         * the <code>Mediator</code> is interested in.
         */
        handleNotification:function(notification) {
        }
    },

    destruct: function () {

    }
});
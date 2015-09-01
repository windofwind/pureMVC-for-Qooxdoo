/*
 * Created by Wind on 1/28/14.
 */

/**
 * A base <code>ICommand</code> implementation.
 *
 * <P>
 * Your subclass should override the <code>execute</code>
 * method where your business logic will handle the <code>INotification</code>. </P>
 *
 * @see mvc.core.controller.Controller Controller
 * @see mvc.patterns.observer.Notification Notification
 * @see mvc.patterns.command.MacroCommand MacroCommand
 */

qx.Class.define("mvc.patterns.command.SimpleCommand", {
    extend: mvc.patterns.observer.Notifier,
    implement : [
        mvc.interfaces.ICommand,
        mvc.interfaces.INotifier,
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
     * You should not need to define a constructor,
     * instead, override the <code>initializeMacroCommand</code>
     * method.</P>
     *
     * <P>
     * If your subclass does define a constructor, be
     * sure to call <code>super()</code>.</P>
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
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Fulfill the use-case initiated by the given <code>INotification</code>.
         *
         * <P>
         * In the Command Pattern, an application use-case typically
         * begins with some user action, which results in an <code>INotification</code> being broadcast, which
         * is handled by business logic in the <code>execute</code> method of an
         * <code>ICommand</code>.</P>
         *
         * @param notification {mvc.interfaces.INotification} the <code>INotification</code> to handle.
         */
        execute:function(notification) {

        }
    },

    destruct: function () {
    }
});
/*
 * Created by Wind on 1/28/14.
 */

/**
 * The interface definition for a PureMVC Observer.
 *
 * <P>
 * In PureMVC, <code>IObserver</code> implementors assume these responsibilities:</P>
 * <UL>
 * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
 * <LI>Encapsulate the notification context (this) of the interested object.</LI>
 * <LI>Provide methods for setting the interested object' notification method and context.</LI>
 * <LI>Provide a method for notifying the interested object.</LI>
 * </UL>
 *
 * <P>
 * PureMVC does not rely upon underlying event
 * models such as the one provided with Flash,
 * and ActionScript 3 does not have an inherent
 * event model.</P>
 *
 * <P>
 * The Observer Pattern as implemented within
 * PureMVC exists to support event driven communication
 * between the application and the actors of the
 * MVC triad.</P>
 *
 * <P>
 * An Observer is an object that encapsulates information
 * about an interested object with a notification method that
 * should be called when an <code>INotification</code> is broadcast. The Observer then
 * acts as a proxy for notifying the interested object.</P>
 *
 * <P>
 * Observers can receive <code>Notification</code>s by having their
 * <code>notifyObserver</code> method invoked, passing
 * in an object implementing the <code>INotification</code> interface, such
 * as a subclass of <code>Notification</code>.</P>
 *
 * @see mvc.interfaces.IView IView
 * @see mvc.interfaces.INotification INotification
 */

qx.Interface.define("mvc.interfaces.IObserver", {
    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Notify the interested object.
         *
         * @param notification {INotification} the <code>INotification</code> to pass to the interested object's notification method
         * @return {void}
         */
        notifyObserver:function(notification) {},


        /**
         * Compare the given object to the notificaiton context object.
         *
         * @param object {Object} the object to compare.
         * @return {Boolean} indicating if the notification context and the object are the same.
         */
        compareNotifyContext:function(object) {}
    }
});
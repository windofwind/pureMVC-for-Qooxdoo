/**
 * Created by Wind on 1/28/14.
 */

/**
 * The interface definition for a PureMVC View.
 *
 * <P>
 * In PureMVC, <code>IView</code> implementors assume these responsibilities:</P>
 *
 * <P>
 * In PureMVC, the <code>View</code> class assumes these responsibilities:</P>
 * <UL>
 * <LI>Maintain a cache of <code>IMediator</code> instances.</LI>
 * <LI>Provide methods for registering, retrieving, and removing <code>IMediators</code>.</LI>
 * <LI>Managing the observer lists for each <code>INotification</code> in the application.</LI>
 * <LI>Providing a method for attaching <code>IObservers</code> to an <code>INotification</code>'s observer list.</LI>
 * <LI>Providing a method for broadcasting an <code>INotification</code>.</LI>
 * <LI>Notifying the <code>IObservers</code> of a given <code>INotification</code> when it broadcast.</LI>
 * </UL>
 *
 * @see mvc.IMediator IMediator
 * @see mvc.IObserver IObserver
 * @see mvc.INotification INotification
 */
qx.Interface.define("mvc.interfaces.IView", {
    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Register an <code>IObserver</code> to be notified
         * of <code>INotifications</code> with a given name.
         *
         * @param notificationName {String} the name of the <code>INotifications</code> to notify this <code>IObserver</code> of
         * @param observer {mvc.interfaces.IObserver} the <code>IObserver</code> to register
         * @return {void}
         */
        registerObserver:function(notificationName, observer) {},

        /**
         * Remove a group of observers from the observer list for a given Notification name.
         *
         * @param notificationName {String} which observer list to remove from
         * @param notifyContext {Object} removed the observers with this object as their notifyContext
         */
        removeObserver:function(notificationName, notifyContext) {},

        /**
         * Notify the <code>IObservers</code> for a particular <code>INotification</code>.
         *
         * <P>
         * All previously attached <code>IObservers</code> for this <code>INotification</code>'s
         * list are notified and are passed a reference to the <code>INotification</code> in
         * the order in which they were registered.</P>
         *
         * @param notification {mvc.interfaces.INotification} the <code>INotification</code> to notify <code>IObservers</code> of.
         */
        notifyObservers:function(notification) {},

        /**
         * Register an <code>IMediator</code> instance with the <code>View</code>.
         *
         * <P>
         * Registers the <code>IMediator</code> so that it can be retrieved by name,
         * and further interrogates the <code>IMediator</code> for its
         * <code>INotification</code> interests.</P>
         * <P>
         * If the <code>IMediator</code> returns any <code>INotification</code>
         * names to be notified about, an <code>Observer</code> is created encapsulating
         * the <code>IMediator</code> instance's <code>handleNotification</code> method
         * and registering it as an <code>Observer</code> for all <code>INotifications</code> the
         * <code>IMediator</code> is interested in.</P>
         *
         * @param mediator {mvc.interfaces.IMediator} a reference to the <code>IMediator</code> instance
         */
        registerMediator:function(mediator) {},

        /**
         * Retrieve an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName {String} the name of the <code>IMediator</code> instance to retrieve.
         * @return {mvc.interfaces.IMediator} the <code>IMediator</code> instance previously registered with the given <code>mediatorName</code>.
         */
        retrieveMediator:function(mediatorName) {},

        /**
         * Remove an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName {String} name of the <code>IMediator</code> instance to be removed.
         * @return {mvc.interfaces.IMediator} the <code>IMediator</code> that was removed from the <code>View</code>
         */
        removeMediator:function(mediatorName) {},

        /**
         * Check if a Mediator is registered or not
         *
         * @param mediatorName {String}
         * @return {mvc.interfaces.IMediator} whether a Mediator is registered with the given <code>mediatorName</code>.
         */
        hasMediator:function(mediatorName) {}
    }
});
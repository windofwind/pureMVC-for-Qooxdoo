/**
 * The interface definition for a PureMVC Controller.
 *
 * <P>
 * In PureMVC, an <code>IController</code> implementor
 * follows the 'Command and Controller' strategy, and
 * assumes these responsibilities:</P>
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
 * @see mvc.interfaces INotification
 * @see mvc.interfaces ICommand
 */

qx.Interface.define("mvc.interfaces.IController", {

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Execute the <code>ICommand</code>'s logic to handle a given <code>INotification</code>.
         *
         * @param notificationName {String}  the name of the <code>INotification</code>
         * @param commandClassRef {mvc.interfaces.INotification}  the Class of the <code>ICommand</code>
         */
        registerCommand:function( notificationName, commandClassRef) {},

        /**
         * Execute the <code>ICommand</code> previously registered as the handler
         * for <code>INotification</code>s with the given notification name.
         *
         * @param notification {mvc.interfaces.INotification}
         *            the <code>INotification</code> to execute the associated
         *            <code>ICommand</code> for
         */
        executeCommand:function( notification ) {},

        /**
         * Remove a previously registered <code>ICommand</code> to
         * <code>INotification</code> mapping.
         *
         * @param notificationName {String}
         *            the name of the <code>INotification</code> to remove the
         *            <code>ICommand</code> mapping for
         */
        removeCommand:function( notificationName ) {},

        /**
         * Check if a Command is registered for a given Notification
         *
         * @param notificationName {String}
         * @return {Boolean} whether a Command is currently registered for the given <code>notificationName</code>.
         */
        hasCommand:function( notificationName ) {}
    }
});
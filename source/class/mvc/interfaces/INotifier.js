/**
 * Created by Wind on 1/28/14.
 */

/**
 * The interface definition for a PureMVC Notifier.
 *
 * <P>
 * <code>MacroCommand, Command, Mediator</code> and <code>Proxy</code>
 * all have a need to send <code>Notifications</code>. </P>
 *
 * <P>
 * The <code>INotifier</code> interface provides a common method called
 * <code>sendNotification</code> that relieves implementation code of
 * the necessity to actually construct <code>Notifications</code>.</P>
 *
 * <P>
 * The <code>Notifier</code> class, which all of the above mentioned classes
 * extend, also provides an initialized reference to the <code>Facade</code>
 * Singleton, which is required for the convienience method
 * for sending <code>Notifications</code>, but also eases implementation as these
 * classes have frequent <code>Facade</code> interactions and usually require
 * access to the facade anyway.</P>
 *
 * @see mvc.interfaces.IFacade IFacade
 * @see mvc.interfaces.INotification INotification
 */
qx.Interface.define("mvc.interfaces.INotifier", {
    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Send a <code>INotification</code>.
         *
         * <P>
         * Convenience method to prevent having to construct new
         * notification instances in our implementation code.</P>
         *
         * @param notificationName {String} the name of the notification to send
         * @param body {Object} the body of the notification (optional)
         * @param type {Object} the type of the notification (optional)
         * @return {void}
         */
        sendNotification: function( notificationName, body, type ) {}
    }
});
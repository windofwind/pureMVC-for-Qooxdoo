/**
 * The interface definition for a PureMVC Command.
 *
 * @see mvc.interfaces INotification
 */

qx.Interface.define("mvc.interfaces.ICommand", {

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Execute the <code>mvc.interfaces.INotification</code>'s logic to handle a given <code>INotification</code>.
         *
         * @param notification {mvc.interfaces.INotification} note an <code>INotification</code> to handle.
         */
        execute:function( notification ) {}
    }
});
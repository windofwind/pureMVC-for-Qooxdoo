/*
 * Created by Wind on 1/28/14.
 */

/**
 * The interface definition for a PureMVC Model.
 *
 * <P>
 * In PureMVC, <code>IModel</code> implementors provide
 * access to <code>IProxy</code> objects by named lookup. </P>
 *
 * <P>
 * An <code>IModel</code> assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Maintain a cache of <code>IProxy</code> instances</LI>
 * <LI>Provide methods for registering, retrieving, and removing <code>IProxy</code> instances</LI>
 * </UL>
 */

qx.Interface.define("mvc.interfaces.IModel", {
    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Register an <code>IProxy</code> instance with the <code>Model</code>.
         *
         * @param proxy {mvc.interfaces.IProxy} the name to associate with this <code>IProxy</code> instance.
         *
         */
        registerProxy:function( proxy ) {},

        /**
         * Retrieve an <code>IProxy</code> instance from the Model.
         *
         * @param proxyName {String}
         * @return {mvc.interfaces.IProxy} the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
         */
        retrieveProxy:function(proxyName) {},

        /**
         * Remove an <code>IProxy</code> instance from the Model.
         *
         * @param proxyName {String} name of the <code>IProxy</code> instance to be removed.
         * @return {mvc.interfaces.IProxy} the <code>IProxy</code> that was removed from the <code>Model</code>
         */
        removeProxy:function(proxyName) {},

        /**
         * Check if a Proxy is registered
         *
         * @param proxyName {String}
         * @return {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
         */
        hasProxy:function(proxyName) {}
    }
});
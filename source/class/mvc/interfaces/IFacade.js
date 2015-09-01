/*
 * Created by Wind on 1/28/14.
 */

/**
 * The interface definition for a PureMVC Facade.
 *
 * <P>
 * The Facade Pattern suggests providing a single
 * class to act as a central point of communication
 * for a subsystem. </P>
 *
 * <P>
 * In PureMVC, the Facade acts as an interface between
 * the core MVC actors (Model, View, Controller) and
 * the rest of your application.</P>
 *
 * @see mvc.interfaces.IModel IModel
 * @see mvc.interfaces.IView IView
 * @see mvc.interfaces.IController IController
 * @see mvc.interfaces.ICommand ICommand
 * @see mvc.interfaces.INotification INotification
 */

qx.Interface.define("mvc.interfaces.IFacade", {
    extend: [mvc.interfaces.INotifier],

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        /**
         * Register an <code>IProxy</code> with the <code>Model</code> by name.
         *
         * @param proxy {mvc.interfaces.IProxy}
         *            the <code>IProxy</code> to be registered with the
         *            <code>Model</code>.
         */
        registerProxy:function( proxy ) {},

        /**
         * Retrieve a <code>IProxy</code> from the <code>Model</code> by name.
         *
         * @param proxyName {String}
         *            the name of the <code>IProxy</code> instance to be
         *            retrieved.
         * @return {mvc.interfaces.IProxy} the <code>IProxy</code> previously regisetered by
         *         <code>proxyName</code> with the <code>Model</code>.
         */
        retrieveProxy:function( proxyName ) {},

        /**
         * Remove an <code>IProxy</code> instance from the <code>Model</code> by
         * name.
         *
         * @param proxyName {String}
         *            the <code>IProxy</code> to remove from the
         *            <code>Model</code>.
         * @return {mvc.interfaces.IProxy}
         */
        removeProxy:function( proxyName ) {},

        /**
         * Check if a Proxy is registered.
         *
         * @param proxyName {String}
         * @return {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
         */
        hasProxy:function( proxyName ) {},

        /**
         * Register an <code>ICommand</code> with the <code>Controller</code>.
         *
         * @param noteName {String}
         *            the name of the <code>INotification</code> to associate the
         *            <code>ICommand</code> with.
         * @param commandClassRef {Class}
         *            a reference to the <code>Class</code> of the
         *            <code>ICommand</code>.
         */
        registerCommand:function( noteName, commandClassRef) {},

        /**
         * Remove a previously registered <code>ICommand</code> to <code>INotification</code> mapping from the Controller.
         *
         * @param notificationName {String} the name of the <code>INotification</code> to remove the <code>ICommand</code> mapping for
         */
        removeCommand:function( notificationName ) {},

        /**
         * Check if a Command is registered for a given Notification
         *
         * @param notificationName {String}
         * @return {Boolean} whether a Command is currently registered for the given <code>notificationName</code>.
         */
        hasCommand:function( notificationName ) {},

        /**
         * Register an <code>IMediator</code> instance with the <code>View</code>.
         *
         * @param mediator {mvc.interfaces.IMediator}
         *            a reference to the <code>IMediator</code> instance
         */
        registerMediator:function( mediator ) {},

        /**
         * Retrieve an <code>IMediator</code> instance from the <code>View</code>.
         *
         * @param mediatorName {String}
         *            the name of the <code>IMediator</code> instance to retrievve
         * @return {mvc.interfaces.IMediator} the <code>IMediator</code> previously registered with the given
         *         <code>mediatorName</code>.
         */
        retrieveMediator:function( mediatorName ) {},

        /**
         * Check if a Mediator is registered or not
         *
         * @param mediatorName {String}
         * @return {Boolean} whether a Mediator is registered with the given name of the <code>IMediator</code>.
         */
        hasMediator:function( mediatorName ) {},

        /**
         * Remove a <code>IMediator</code> instance from the <code>View</code>.
         *
         * @param mediatorName {String}
         *            name of the <code>IMediator</code> instance to be removed.
         * @return {void}
         */
        removeMediator:function( mediatorName ) {}
    }
});
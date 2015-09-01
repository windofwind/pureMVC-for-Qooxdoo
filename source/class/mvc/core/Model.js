/*
 * Created by Wind on 1/28/14.
 */

/**
 * A Singleton <code>IModel</code> implementation.
 *
 * <P>
 * In PureMVC, the <code>Model</code> class provides
 * access to model objects (Proxies) by named lookup. </P>
 *
 * <P>
 * The <code>Model</code> assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Maintain a cache of <code>IProxy</code> instances.</LI>
 * <LI>Provide methods for registering, retrieving, and removing
 * <code>IProxy</code> instances.</LI>
 * </UL>
 *
 * <P>
 * Your application must register <code>IProxy</code> instances
 * with the <code>Model</code>. Typically, you use an
 * <code>ICommand</code> to create and register <code>IProxy</code>
 * instances once the <code>Facade</code> has initialized the Core
 * actors.</P>
 *
 * @see mvc.patterns.Proxy Proxy
 * @see mvc.interfaces.IProxy IProxy
 */
qx.Class.define("mvc.core.Model", {
//    type:"singleton",
    extend: qx.core.Object,
    implement : mvc.interfaces.IModel,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        _instance:null,
        getInstance:function() {
            if (this._instance == null) {
                this._instance = new this();
            }
            return this._instance;
        },

        removeInstance:function() {
            if (this._instance) {
                this._instance.dispose();
                this._instance = null;
            }
        }
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
     * This <code>IModel</code> implementation is a Singleton,
     * so you should not call the constructor
     * directly, but instead call the static Singleton
     * Factory method <code>Model.getInstance()</code></P>
     *
     */
    construct: function () {
        this.base(arguments);

        this._proxyMap = {};
        this._initializeModel();
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
        _proxyMap:null,

        /**
         * Initialize the Singleton <code>Model</code> instance.
         *
         * <P>
         * Called automatically by the constructor, this
         * is your opportunity to initialize the Singleton
         * instance in your subclass without overriding the
         * constructor.</P>
         *
         * @return {void}
         */
        _initializeModel:function( ) {
        },


        /**
         * Register an <code>IProxy</code> with the <code>Model</code>.
         *
         * @param proxy {mvc.pattern.proxy.Proxy}
         */
        registerProxy:function( proxy ) {
            this.removeProxy( proxy.getProxyName() );
            this._proxyMap[ proxy.getProxyName() ] = proxy;
        },

        /**
         * Retrieve an <code>IProxy</code> from the <code>Model</code>.
         *
         * @param proxyName {String}
         * @return {mvc.interfaces.IProxy} the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
         */
        retrieveProxy:function( proxyName ) {
            return this._proxyMap[ proxyName ];
        },


        /**
         * Check if a Proxy is registered
         *
         * @param proxyName {String}
         * @return {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
         */
        hasProxy:function( proxyName ) {
            return this._proxyMap[ proxyName ] != null;
        },

        /**
         * Remove an <code>IProxy</code> from the <code>Model</code>.
         *
         * @param proxyName {String}
         */
        removeProxy:function( proxyName ) {
            var proxy = this._proxyMap[proxyName];

            if ( proxy ) {
                this._proxyMap[ proxyName ] = null;
                delete this._proxyMap[ proxyName ];
                proxy.dispose();
            }
        }
    },

    destruct: function () {
        for (var name in this._proxyMap) {
	        this.removeProxy( name );
        }
    }
});
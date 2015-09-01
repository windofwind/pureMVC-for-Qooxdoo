/*
 * Created by Wind on 1/28/14.
 */

/**
 * A base <code>IProxy</code> implementation.
 *
 * <P>
 * In PureMVC, <code>Proxy</code> classes are used to manage parts of the
 * application's data model. </P>
 *
 * <P>
 * A <code>Proxy</code> might simply manage a reference to a local data object,
 * in which case interacting with it might involve setting and
 * getting of its data in synchronous fashion.</P>
 *
 * <P>
 * <code>Proxy</code> classes are also used to encapsulate the application's
 * interaction with remote services to save or retrieve data, in which case,
 * we adopt an asyncronous idiom; setting data (or calling a method) on the
 * <code>Proxy</code> and listening for a <code>Notification</code> to be sent
 * when the <code>Proxy</code> has retrieved the data from the service. </P>
 *
 * @see mvc.core.model.Model Model
 */
qx.Class.define("mvc.patterns.Proxy", {
    extend: mvc.patterns.observer.Notifier,
    implement : [
        mvc.interfaces.IProxy,
        mvc.interfaces.INotifier
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
     * Constructor
     * @param proxyName {String}
     * @param data {Object}
     */
    construct: function (proxyName, data) {
        this.base(arguments);

        if (proxyName) {
            this.setProxyName(proxyName);
        }

        if (data) {
            this.setData(data);
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
        proxyName:{
            init:"Proxy",
            check:"String"
        },

        data:{
            init:null,
            check:"Object",
            apply:"_applyData"
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        _applyData:function(value, old) {
        }
    },

    destruct: function () {
    }
});
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var createLoadingPlugin = function createLoadingPlugin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$namespace = _ref.namespace,
      NAMESPACE = _ref$namespace === void 0 ? "loading" : _ref$namespace;

  var SHOW = "@@ANTDV_LOADING/SHOW";
  var HIDE = "@@ANTDV_LOADING/HIDE";
  return function (store) {
    var _mutations;

    if (store.state[NAMESPACE]) {
      throw new Error("createLoadingPlugin: ".concat(NAMESPACE, " exited in current store"));
    }

    store.registerModule(NAMESPACE, {
      namespaced: true,
      state: {
        global: false,
        models: {},
        effects: {}
      },
      mutations: (_mutations = {}, _defineProperty(_mutations, SHOW, function (state, _ref2) {
        var actionType = _ref2.payload.actionType;
        state.global = true;
        var _namespace = actionType.split("/")[0];
        state.models = _objectSpread2(_objectSpread2({}, state.models), {}, _defineProperty({}, _namespace, true));
        state.effects = _objectSpread2(_objectSpread2({}, state.effects), {}, _defineProperty({}, actionType, true));
      }), _defineProperty(_mutations, HIDE, function (state, _ref3) {
        var actionType = _ref3.payload.actionType;
        state.global = false;
        var _namespace = actionType.split("/")[0];
        state.models = _objectSpread2(_objectSpread2({}, state.models), {}, _defineProperty({}, _namespace, false));
        state.effects = _objectSpread2(_objectSpread2({}, state.effects), {}, _defineProperty({}, actionType, false));
      }), _mutations)
    });
    store.subscribeAction({
      before: function before(action) {
        store.commit({
          type: "".concat(NAMESPACE, "/").concat(SHOW),
          payload: {
            actionType: action.type
          }
        }, {
          root: true
        });
      },
      after: function after(action) {
        store.commit({
          type: "".concat(NAMESPACE, "/").concat(HIDE),
          payload: {
            actionType: action.type
          }
        }, {
          root: true
        });
      }
    });
  };
};

export { createLoadingPlugin as Loading };

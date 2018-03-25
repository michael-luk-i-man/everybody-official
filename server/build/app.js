(function (_, Kotlin, $module$pusher) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var express;
  function pusherConfig$ObjectLiteral() {
    this.appId = '497481';
    this.key = 'e686a9066178e8304923';
    this.secret = 'bb5453e06c069a608b44';
    this.cluster = 'us2';
    this.encrypted = true;
  }
  pusherConfig$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: []
  };
  var pusherConfig;
  var clickChannel;
  var clickEvent;
  var currentClickCount;
  function main$lambda(f, res) {
    return res.json(new ClickCount(currentClickCount));
  }
  function main$lambda_0(closure$pusher) {
    return function (f, res) {
      currentClickCount = currentClickCount + 1 | 0;
      closure$pusher.trigger(clickChannel, clickEvent, new ClickCount(currentClickCount));
      return res.status(200).send();
    };
  }
  function main$lambda_1() {
    println('Listening on port 9999');
  }
  function main(args) {
    var app = express();
    var pusher = new $module$pusher(pusherConfig);
    app.get('/counts', main$lambda);
    app.post('/clicks', main$lambda_0(pusher));
    app.listen(9999, main$lambda_1);
  }
  function ClickCount(count) {
    this.count = count;
  }
  ClickCount.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ClickCount',
    interfaces: []
  };
  ClickCount.prototype.component1 = function () {
    return this.count;
  };
  ClickCount.prototype.copy_za3lpa$ = function (count) {
    return new ClickCount(count === void 0 ? this.count : count);
  };
  ClickCount.prototype.toString = function () {
    return 'ClickCount(count=' + Kotlin.toString(this.count) + ')';
  };
  ClickCount.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.count) | 0;
    return result;
  };
  ClickCount.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.count, other.count))));
  };
  Object.defineProperty(_, 'express', {
    get: function () {
      return express;
    }
  });
  Object.defineProperty(_, 'pusherConfig', {
    get: function () {
      return pusherConfig;
    }
  });
  Object.defineProperty(_, 'clickChannel', {
    get: function () {
      return clickChannel;
    }
  });
  Object.defineProperty(_, 'clickEvent', {
    get: function () {
      return clickEvent;
    }
  });
  Object.defineProperty(_, 'currentClickCount', {
    get: function () {
      return currentClickCount;
    },
    set: function (value) {
      currentClickCount = value;
    }
  });
  _.main_kand9s$ = main;
  _.ClickCount = ClickCount;
  express = require('express');
  pusherConfig = new pusherConfig$ObjectLiteral();
  clickChannel = 'click-channel';
  clickEvent = 'click-event';
  currentClickCount = 0;
  main([]);
  Kotlin.defineModule('app', _);
  return _;
}(module.exports, require('kotlin'), require('pusher')));

'use strict';

define("pilas-engine/tests/acceptance/puede-eliminar-escenas-test", ["@ember/test-helpers", "qunit", "ember-qunit", "pilas-engine/tests/helpers/pulsar", "pilas-engine/tests/helpers/esperar-elemento", "pilas-engine/tests/helpers/esperar"], function (_testHelpers, _qunit, _emberQunit, _pulsar, _esperarElemento, _esperar) {
  "use strict";

  (0, _qunit.module)("Acceptance | puede ingresar al editor", function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    const PAUSA = 2;
    (0, _qunit.test)("puede ingresar al editor y eliminar una escena", async function (assert) {
      await (0, _testHelpers.visit)("/");
      await (0, _pulsar.default)("Abrir el editor");
      localStorage.removeItem("pilas:proyecto_serializado");
      assert.equal((0, _testHelpers.currentURL)(), "/iniciar-proyecto", "accede al editor correctamente");
      await (0, _testHelpers.click)("#inicial");
      assert.equal((0, _testHelpers.currentURL)(), "/editor", "accede al editor correctamente");
      await (0, _esperarElemento.default)("a#ejecutar");
      await (0, _pulsar.default)("Ejecutar");
      await (0, _esperar.default)(PAUSA);
      await (0, _pulsar.default)("Detener");
      await (0, _esperar.default)(PAUSA);
      assert.equal(document.querySelectorAll("[data-test='nombre-de-escena']").length, 2, "Corrobora que hay dos escenas (escena1 y escena2)");
      await (0, _testHelpers.click)("#boton-eliminar-escena");
      await (0, _pulsar.default)("Sí");
      assert.equal(document.querySelectorAll("[data-test='nombre-de-escena']").length, 1, "Quedó una sola escena (escena2)");
      await (0, _esperar.default)(PAUSA);
    });
  });
});
define("pilas-engine/tests/acceptance/puede-ingresar-al-editor-test", ["@ember/test-helpers", "qunit", "ember-qunit", "pilas-engine/tests/helpers/pulsar", "pilas-engine/tests/helpers/esperar", "pilas-engine/tests/helpers/esperar-elemento"], function (_testHelpers, _qunit, _emberQunit, _pulsar, _esperar, _esperarElemento) {
  "use strict";

  (0, _qunit.module)("Acceptance | puede ingresar al editor", function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    const PAUSA = 2;
    (0, _qunit.test)("puede ingresar a la pantalla principal", async function (assert) {
      await (0, _testHelpers.visit)("/");
      assert.dom("#pilas-logo").exists();
      assert.equal((0, _testHelpers.currentURL)(), "/", "Está en la ruta principal");
      await (0, _pulsar.default)("Abrir el editor");
      assert.equal((0, _testHelpers.currentURL)(), "/iniciar-proyecto", "Aparece el selector de plantilla");
      await (0, _testHelpers.click)("#inicial");
      await (0, _esperarElemento.default)("a#ejecutar");
      await (0, _pulsar.default)("Ejecutar");
      await (0, _esperar.default)(PAUSA);
      await (0, _pulsar.default)("Detener");
      await (0, _esperar.default)(PAUSA);
      await (0, _pulsar.default)("Ejecutar");
      await (0, _esperar.default)(PAUSA);
      await (0, _pulsar.default)("Pausar");
      await (0, _esperar.default)(PAUSA);

      function cambiar_input(valor) {
        let elemento = document.querySelector("input#posicion");
        elemento.value = valor;

        function triggerEvent(el, type) {
          let e = null;

          if ("createEvent" in document) {
            e = document.createEvent("HTMLEvents");
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
          } else {
            e = document.createEventObject();
            e.eventType = type;
            el.fireEvent("on" + e.eventType, e);
          }
        }

        triggerEvent(elemento, "input");
        return (0, _esperar.default)(0.01);
      }

      for (let i = 140; i >= 0; i -= 2) {
        await cambiar_input(i);
      }

      await (0, _esperar.default)(PAUSA / 2);

      for (let i = 0; i <= 140; i += 2) {
        await cambiar_input(i);
      }

      await (0, _esperar.default)(PAUSA / 2);
      await (0, _pulsar.default)("Detener");
      await (0, _esperar.default)(PAUSA);
      await (0, _testHelpers.click)(".test-regresar");
      assert.equal((0, _testHelpers.currentURL)().replace("?livereload=false", ""), "/", "Pudo regresar a la ruta inicial.");
    });
  });
});
define("pilas-engine/tests/acceptance/puede-ingresar-en-la-seccion-pruebas-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)("Acceptance | puede ingresar en la seccion pruebas", function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)("visiting /puede-ingresar-en-la-seccion-pruebas", async function (assert) {
      await (0, _testHelpers.visit)("/pruebas");
      assert.equal((0, _testHelpers.currentURL)(), "/pruebas");
    });
  });
});
define("pilas-engine/tests/acceptance/puede-visitar-cada-uno-de-los-ejemplos-test", ["@ember/test-helpers", "qunit", "ember-qunit", "pilas-engine/tests/helpers/pulsar", "pilas-engine/tests/helpers/esperar"], function (_testHelpers, _qunit, _emberQunit, _pulsar, _esperar) {
  "use strict";

  //import esperarElemento from "pilas-engine/tests/helpers/esperar-elemento";
  (0, _qunit.module)("Acceptance | puede visitar cada uno de los ejemplos", function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    const PAUSA = 5;
    (0, _qunit.test)("puede visitar cada uno de los ejemplos", async function (assert) {
      await (0, _testHelpers.visit)("/");
      assert.dom("#pilas-logo").exists();
      assert.equal((0, _testHelpers.currentURL)(), "/", "Está en la ruta principal");
      await (0, _pulsar.default)("Ver ejemplos");
      assert.equal((0, _testHelpers.currentURL)(), "/ejemplos", "Ingresó en la sección de ejemplos");
      await (0, _esperar.default)(PAUSA);
      let items = document.querySelectorAll("a.ejemplo");
      assert.equal(1, 1, `Prueba los ${items.length} ejemplos:`);

      for (let i = 0; i < items.length; i++) {
        let link = items[i].getAttribute("href");
        await (0, _testHelpers.visit)(link);
        let nombre = document.getElementById("test-nombre").getAttribute("data-nombre");
        assert.equal(1, 1, `Probando ejemplo ${i}/${items.length} - ${nombre}`);
        await (0, _esperar.default)(PAUSA);
      }
    });
  });
});
define("pilas-engine/tests/helpers/ember-keyboard/register-test-helpers", ["exports", "ember-keyboard", "ember-keyboard/fixtures/modifiers-array", "ember-keyboard/fixtures/mouse-buttons-array", "ember-keyboard/utils/get-cmd-key"], function (_exports, _emberKeyboard, _modifiersArray, _mouseButtonsArray, _getCmdKey) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  const keyEvent = function keyEvent(app, attributes, type, element) {
    const event = (attributes || '').split('+').reduce((event, attribute) => {
      if (_modifiersArray.default.indexOf(attribute) > -1) {
        attribute = attribute === 'cmd' ? (0, _getCmdKey.default)() : attribute;
        event[`${attribute}Key`] = true;
      } else if (_mouseButtonsArray.default.indexOf(attribute) > -1) {
        event.button = (0, _emberKeyboard.getMouseCode)(attribute);
      } else {
        event.keyCode = (0, _emberKeyboard.getKeyCode)(attribute);
      }

      return event;
    }, {});
    return app.testHelpers.triggerEvent(element || document.body, type, event);
  };

  function _default() {
    Ember.Test.registerAsyncHelper('keyDown', function (app, attributes, element) {
      return keyEvent(app, attributes, 'keydown', element);
    });
    Ember.Test.registerAsyncHelper('keyUp', function (app, attributes, element) {
      return keyEvent(app, attributes, 'keyup', element);
    });
    Ember.Test.registerAsyncHelper('keyPress', function (app, attributes, element) {
      return keyEvent(app, attributes, 'keypress', element);
    });
    Ember.Test.registerAsyncHelper('mouseDown', function (app, attributes, element) {
      return keyEvent(app, attributes, 'mousedown', element);
    });
    Ember.Test.registerAsyncHelper('mouseUp', function (app, attributes, element) {
      return keyEvent(app, attributes, 'mouseup', element);
    });
    Ember.Test.registerAsyncHelper('touchStart', function (app, attributes, element) {
      return keyEvent(app, attributes, 'touchstart', element);
    });
    Ember.Test.registerAsyncHelper('touchEnd', function (app, attributes, element) {
      return keyEvent(app, attributes, 'touchend', element);
    });
  }
});
define("pilas-engine/tests/helpers/ember-power-select", ["exports", "ember-power-select/test-support/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = deprecatedRegisterHelpers;
  _exports.selectChoose = _exports.touchTrigger = _exports.nativeTouch = _exports.clickTrigger = _exports.typeInSearch = _exports.triggerKeydown = _exports.nativeMouseUp = _exports.nativeMouseDown = _exports.findContains = void 0;

  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, {
        until: '1.11.0',
        id: `ember-power-select-test-support-${name}`
      }));
      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  _exports.findContains = findContains;
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  _exports.nativeMouseDown = nativeMouseDown;
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  _exports.nativeMouseUp = nativeMouseUp;
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  _exports.triggerKeydown = triggerKeydown;
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  _exports.typeInSearch = typeInSearch;
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  _exports.clickTrigger = clickTrigger;
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  _exports.nativeTouch = nativeTouch;
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  _exports.touchTrigger = touchTrigger;
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');
  _exports.selectChoose = selectChoose;

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, {
      until: '1.11.0',
      id: 'ember-power-select-test-support-register-helpers'
    }));
    return (0, _helpers.default)();
  }
});
define("pilas-engine/tests/helpers/esperar-elemento", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = esperarElemento;

  async function esperarElemento(selector) {
    await new Ember.RSVP.Promise((success, fail) => {
      let cantidadDeIntentos = 0;

      function existeElemento() {
        return document.querySelectorAll(selector).length > 0;
      }

      consultarExistenciaDiferida();

      function consultarExistenciaDiferida() {
        Ember.run.later(() => {
          if (existeElemento()) {
            success();
          } else {
            cantidadDeIntentos += 1;

            if (cantidadDeIntentos > 20) {
              fail(new Error(`No se encontró el elemento '${selector}', incluso con una espera.`));
            } else {
              consultarExistenciaDiferida();
            }
          }
        }, 1000);
      }
    });
  }
});
define("pilas-engine/tests/helpers/esperar", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = esperar;

  async function esperar(segundos) {
    await new Ember.RSVP.Promise(success => {
      Ember.run.later(success, segundos * 1000);
    });
  }
});
define("pilas-engine/tests/helpers/pulsar", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = pulsar;

  async function pulsar(texto) {
    let elemento = [].slice.call(document.querySelectorAll(`a`)).filter(a => a.innerHTML.includes(texto));

    if (elemento.length === 0) {
      throw new Error(`No existe un tag a con el texto: '${texto}'.`);
    }

    if (elemento.length > 1) {
      throw new Error(`Hay ${elemento.length} elemento con el texto: '${texto}', se esperaba solo uno.`);
    }

    await new Ember.RSVP.Promise(function (resolve) {
      Ember.run.later(() => {
        resolve();
      }, 1000);
    });
    await elemento[0].click();
  }
});
define("pilas-engine/tests/helpers/resolver", ["exports", "pilas-engine/resolver", "pilas-engine/config/environment"], function (_exports, _resolver, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };
  var _default = resolver;
  _exports.default = _default;
});
define("pilas-engine/tests/integration/components/abrir-selector-con-teclado-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | abrir-selector-con-teclado', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "B5bxRj5J",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"abrir-selector-con-teclado\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "M+c+iXlf",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"abrir-selector-con-teclado\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/boton-ocultar-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | boton ocultar", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1oUTurRV",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"boton-ocultar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "4meoPSlx",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"boton-ocultar\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/depurador-electron-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | depurador-electron", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "5Dpc0Ef6",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"depurador-electron\",null,[[\"livereload\"],[false]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/en-electron-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | en electron", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "L/eh1kiq",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"en-electron\",null,null,{\"statements\":[[0,\"        demo\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        otro\\n\"]],\"parameters\":[]}],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("otro");
    });
  });
});
define("pilas-engine/tests/integration/components/iniciar-proyecto/item-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | iniciar-proyecto/item', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "2f7OuAAE",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"iniciar-proyecto/item\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/input-numero-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input-numero', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lcrPJ9ti",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"input-numero\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+TRmiaCc",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input-numero\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/panel-ocultable-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | panel ocultable", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bAlngIqN",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"panel-ocultable\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RhbxV0sz",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"panel-ocultable\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/pantalla/iniciar-proyecto-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pantalla/iniciar-proyecto', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Ve0zDC7F",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pantalla/iniciar-proyecto\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-api-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas api", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fF5p2vRa",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-api\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "O6XVjIl2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-api\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-copiar-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-boton-copiar", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "8oZD5WPH",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-boton-copiar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-duplicar-actor-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas boton duplicar actor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("accion", function () {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "jjKI2w06",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-boton-duplicar-actor\",null,[[\"accion\"],[[25,[\"accion\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('*').textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-exportar-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-boton-exportar", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "CqdSR2i9",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-boton-exportar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-menu-actor-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-boton-menu-actor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "efiD0ZcM",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-boton-menu-actor\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "OLhBWrG2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-boton-menu-actor\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-miniatura-pulsable-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-boton-miniatura-pulsable', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LQgUZ+TR",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-boton-miniatura-pulsable\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "8U3eg89n",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-boton-miniatura-pulsable\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-miniatura-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-boton-miniatura", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "vjb5j7GV",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-boton-miniatura\",null,[[\"icono\"],[\"fps\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), "");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-principal-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas boton principal", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "h0wxiVqx",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-boton-principal\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "cCUf7ZX3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-boton-principal\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-regresar-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas boton regresar", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+GraxZSs",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-boton-regresar\",null,[[\"confirmar\"],[false]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-renombrar-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-boton-renombrar", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/oFKC/jh",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-boton-renombrar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), "");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas boton", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("demo", function () {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "PCr//g4O",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-boton\",null,[[\"accion\",\"texto\"],[[25,[\"demo\"]],\"Ejemplo\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("Ejemplo");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-boton-webserver-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-boton-webserver", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/sjljIgp",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-boton-webserver\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-celda-de-actor-skeleton-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas celda de actor skeleton", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "p/DB794d",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-celda-de-actor-skeleton\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").exists("");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-celda-de-actor-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas celda de actor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("actor", {
        nombre: "aceituna",
        imagen: "aceituna"
      });
      this.set("f", function () {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LB8S+S1j",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-celda-de-actor\",null,[[\"actor\",\"cuandoQuiereCrearActor\"],[[25,[\"actor\"]],[25,[\"f\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.findAll)("div.sprite").length, 1);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-celda-de-imagen-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-celda-de-imagen', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "JbBkvGyw",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-celda-de-imagen\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "4SZa9vVO",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-celda-de-imagen\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-contenido-de-log-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas contenido de log", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "dKmcy7fG",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-contenido-de-log\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "USoC4kJR",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-contenido-de-log\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-crear-actor-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas crear actor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "JzYG/lIN",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n        \"],[7,\"div\"],[11,\"id\",\"modal\"],[9],[10],[0,\"\\n        \"],[1,[23,\"pilas-crear-actor\"],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("Crear actor");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "0OxGHWjA",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"div\"],[11,\"id\",\"modal\"],[9],[10],[0,\"\\n      \"],[1,[29,\"pilas-crear-actor\",null,[[\"cuandoQuiereCrearActor\",\"modalVisible\"],[[25,[\"f\"]],true]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("#dialogoCrearActor #titulo").hasText("Crear actor");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-editor-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas editor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("proyecto", {
        modo_de_video: 'pixelart'
      });
      this.set("ocultarEditor", false);
      this.set("ocultarPropiedades", false);
      this.set("escenaActual", 1);
      this.set("alGuardar", () => {});
      this.set("recursos", {
        data: {
          imagenes: [{
            nombre: "plano",
            ruta: "imagenes/fondos/plano.png"
          }],
          sonidos: [{
            nombre: "laser",
            ruta: "sonidos/laser.mp3"
          }]
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nb/sNvpf",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-editor\",null,[[\"recursos\",\"proyecto\",\"ocultarEditor\",\"ocultarPropiedades\",\"escenaActual\",\"cuandoIntentaGuardar\"],[[25,[\"recursos\"]],[25,[\"proyecto\"]],[25,[\"ocultarEditor\"]],[25,[\"ocultarPropiedades\"]],[25,[\"escenaActual\"]],[25,[\"alGuardar\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)("*").textContent.trim());
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-editor/boton-receta-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-editor/boton-receta", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "zvieeiVl",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-editor/boton-receta\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-ejemplo-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas ejemplo", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    let proyecto = {
      titulo: "Proyecto demo",
      ancho: 500,
      modo_de_video: 'pixelart',
      alto: 500,
      codigos: {
        escenas: [{
          nombre: "principal",
          codigo: "class principal extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
        }],
        actores: [{
          nombre: "nube",
          codigo: 'class nube extends Actor {\n    propiedades = {\n        imagen: "nube"\n    };\n\n    iniciar() {}\n\n    actualizar() {\n        this.x -= 1;\n\n        if (this.x < -500) {\n            this.x = 500;\n        }\n    }\n}'
        }]
      },
      escenas: [{
        nombre: "principal",
        id: 2,
        camara_x: 0,
        camara_y: 0,
        fondo: "decoracion:fondos/fondo-cielo",
        actores: [{
          x: -30.785562632696383,
          y: 59.44798301486199,
          imagen: "nube",
          centro_x: 0.5,
          centro_y: 0.5,
          rotacion: 0,
          escala_x: 1,
          escala_y: 1,
          transparencia: 0,
          etiqueta: "actor",
          espejado: false,
          espejado_vertical: false,
          figura: "",
          figura_dinamica: true,
          figura_ancho: 100,
          figura_alto: 100,
          figura_radio: 40,
          figura_sin_rotacion: false,
          figura_rebote: 1,
          figura_sensor: false,
          id: 1443,
          nombre: "nube"
        }]
      }]
    };
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("proyecto", proyecto);
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1MUOkqUl",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-ejemplo\",null,[[\"debe_mantener_foco\",\"proyecto\"],[false,[25,[\"proyecto\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-ejemplos-es-nuevo-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-ejemplos-es-nuevo", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yx7PQ9Yw",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-ejemplos-es-nuevo\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-esperar-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-esperar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fd4evIaP",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-esperar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qQTpRSLD",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-esperar\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-experimentos-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-experimentos", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "IBJzRPfu",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-experimentos\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-grilla-de-actores-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas grilla de actores", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("actores", [{
        nombre: "aceituna",
        imagen: "aceituna",
        tipo: "Aceituna"
      }]);
      this.set("f", function () {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bw4oNwdN",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-grilla-de-actores\",null,[[\"actores\",\"cuandoQuiereCrearActor\"],[[25,[\"actores\"]],[25,[\"f\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("[test-celda-actor]").hasText("aceituna");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-grilla-de-imagenes-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-grilla-de-imagenes", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "UbgbSdJG",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-grilla-de-imagenes\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-icono-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas icono", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rRLU5/cz",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-icono\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fDmxQ/ec",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-icono\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-input-filtro-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-input-filtro', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "0bAXlt+p",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-input-filtro\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "SoGihvWO",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-input-filtro\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-inspector-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas inspector", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "FHBK8YVp",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-inspector\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("");
      this.set("instancia_seleccionada", Ember.Object.create({
        id: 123,
        x: 20,
        y: 30,
        imagen: "demo",
        sensores: []
      }));
      this.set("tipo_de_la_instancia_seleccionada", "actor");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9juWimjq",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-inspector\",null,[[\"etiqueta\",\"instancia_seleccionada\",\"tipo_de_la_instancia_seleccionada\"],[\"name\",[25,[\"instancia_seleccionada\"]],[25,[\"tipo_de_la_instancia_seleccionada\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      function tiene_texto(t, texto) {
        return t.element.innerHTML.toLowerCase().indexOf(texto.toLowerCase()) > -1;
      }

      assert.ok(tiene_texto(this, "nombre"), "tiene texto nombre");
      assert.ok(tiene_texto(this, "imagen"), "tiene texto imagen");
      assert.ok(tiene_texto(this, "demo"), "tiene texto demo");
      assert.ok(tiene_texto(this, "x"), "tiene texto x");
      assert.ok(tiene_texto(this, "y"), "tiene texto y");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-inspector/actor-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-inspector/actor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("instancia_seleccionada", Ember.Object.create({
        x: 200,
        y: 300,
        sensores: [] //

      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Z+/plKWD",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-inspector/actor\",null,[[\"instancia_seleccionada\"],[[25,[\"instancia_seleccionada\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent.includes("¿Es gaseoso?"));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-inspector/escena-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-inspector/escena", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("instancia_seleccionada", {
        nombre: "prueba",
        camara_x: 100,
        camara_y: 200
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "7LNy0FRB",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-inspector/escena\",null,[[\"instancia_seleccionada\"],[[25,[\"instancia_seleccionada\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent.includes("prueba"));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-inspector/proyecto-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-inspector/proyecto", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("instancia_seleccionada", {
        ancho: 640,
        alto: 480,
        tamaño: "640x480",
        modo_de_video: "suavizado",
        fps: 60,
        nombre_de_la_escena_inicial: "demo",
        escenas: [{
          nombre: "demo"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "YsNlmoKV",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-inspector/proyecto\",null,[[\"instancia_seleccionada\",\"escenas\"],[[25,[\"instancia_seleccionada\"]],[25,[\"escenas\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-interprete-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas interprete", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Rk2k2dNz",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-interprete\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('*').textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-interruptor-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas interruptor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "KKM/74iz",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-interruptor\",null,[[\"variable\",\"texto\"],[true,\"demo\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('*').textContent.trim().indexOf("demo") > -1);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-link-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "QGUvRSpE",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-link\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "KR+2p6pA",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-link\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-lista-de-ejemplos-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas lista de ejemplos", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "egi8IrPH",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-lista-de-ejemplos\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-loader-del-editor-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-loader-del-editor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "baolBHXD",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-loader-del-editor\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-logo-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas logo", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "m+t3bXaT",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-logo\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+3YTRK4N",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-logo\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-mensaje-exportador-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-mensaje-exportador", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("mensaje1", {
        mensaje: "Mensaje de prueba",
        link: "1"
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "KMev241P",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-mensaje-exportador\",null,[[\"mensaje\"],[[25,[\"mensaje1\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      let contenido = this.element.textContent.replace(/[\n\r]+/g, "");
      assert.equal(contenido.replace("1", "").replace("1", "").replace(/\s{2,10}/g, "").trim(), "Mensaje de prueba");
      this.set("mensaje2", {
        codigo: "demo",
        codigoCompleto: ""
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "HI3eR+yl",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-mensaje-exportador\",null,[[\"mensaje\"],[[25,[\"mensaje2\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), "demo");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-modal-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas modal", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("visible", false);
      this.set("cerrar", () => {
        this.set("visible", false);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "d7KGRHXW",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"div\"],[11,\"id\",\"modal\"],[9],[10],[0,\"\\n      \"],[1,[29,\"pilas-modal\",null,[[\"visible\",\"itulo\",\"alCerrar\"],[[25,[\"visible\"]],\"Demo\",[25,[\"cerrar\"]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("");
      this.set("visible", true);
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bqJjY76v",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"div\"],[11,\"id\",\"modal\"],[9],[10],[0,\"\\n      \"],[1,[29,\"pilas-modal\",null,[[\"visible\",\"titulo\",\"alCerrar\"],[[25,[\"visible\"]],\"Demo\",[25,[\"cerrar\"]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("#titulo").hasText("Demo");
      await (0, _testHelpers.click)("#cerrar");
      assert.dom("*").hasText("");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-navegar-ejemplos-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-navegar-ejemplos", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "reTYL27M",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-navegar-ejemplos\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-panel-de-escenas-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas panel de escenas", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("cuandoSelecciona", () => {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "0oh6HtQ0",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-panel-de-escenas\",null,[[\"cuandoSelecciona\"],[[25,[\"cuandoSelecciona\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      let elemento = (0, _testHelpers.find)("*");
      assert.ok(elemento.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-panel-de-escenas/item-actor-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-panel-de-escenas/item-actor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("actor", {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WwOOXzEO",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-panel-de-escenas/item-actor\",null,[[\"actor\"],[[25,[\"actor\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), "");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-panel-de-escenas/item-carpeta-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-panel-de-escenas/item-carpeta", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("carpeta", {
        id: 1,
        nombre: "demo",
        abierta: false
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "IzRON88W",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-panel-de-escenas/item-carpeta\",null,[[\"carpeta\"],[[25,[\"carpeta\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent.trim());
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-propiedad-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas propiedad", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      let propiedad_rotacion = {
        propiedad: "rotacion",
        incremento: 10
      };
      let objeto = Ember.Object.create({
        x: 0,
        y: 0,
        rotacion: 100
      });
      this.set("propiedad", propiedad_rotacion);
      this.set("objeto", objeto);
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "FvN7B7e2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n        \"],[1,[29,\"pilas-propiedad/numero\",null,[[\"etiqueta\",\"objeto\",\"propiedad\"],[\"actor.rotation\",[25,[\"objeto\"]],[25,[\"propiedad\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)("*").textContent.trim(), "tiene que tener texto");
      assert.ok((0, _testHelpers.find)("*").textContent.trim().indexOf("Rotación") > -1, "debe aparecer la etiqueta de la propiedad");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-propiedad/combo-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas propiedad/combo", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      let objeto = Ember.Object.create({
        figura: "circulo"
      });
      let propiedad = {
        tipo: "combo",
        propiedad: "figura",
        opciones: [{
          valor: "",
          texto: "ninguna"
        }, {
          valor: "circulo",
          texto: "círculo"
        }, {
          valor: "rectangulo",
          texto: "rectángulo"
        }]
      };
      this.set("propiedad", propiedad);
      this.set("objeto", objeto);
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Knlr4PNr",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-propiedad/combo\",null,[[\"objeto\",\"propiedad\",\"opciones\"],[[25,[\"objeto\"]],[25,[\"propiedad\"]],[25,[\"propiedad\",\"opciones\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("select option:checked").hasText("círculo");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-propiedad/habilidades-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-propiedad/habilidades", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      let objeto = Ember.Object.create({
        habilidades: []
      });
      let propiedad = {
        tipo: "habilidades",
        propiedad: "habilidades"
      };
      this.set("propiedad", propiedad);
      this.set("objeto", objeto);
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "g06oNHw0",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-propiedad/habilidades\",null,[[\"objeto\",\"etiqueta\",\"propiedad\"],[[25,[\"objeto\"]],\"nombre\",[25,[\"propiedad\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-propiedad/interruptor-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas propiedad/interruptor", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      let objeto = Ember.Object.create({
        invertir: true
      });
      let propiedad = {
        tipo: "interruptor",
        propiedad: "invertir"
      };
      this.set("propiedad", propiedad);
      this.set("objeto", objeto);
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "D37BmOiz",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[29,\"pilas-propiedad/interruptor\",null,[[\"etiqueta\",\"objeto\",\"propiedad\"],[\"nombre\",[25,[\"objeto\"]],[25,[\"propiedad\"]]]]],false],[0,\"\\n      \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("t:nombre:()");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-propiedad/nombre-del-proyecto-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-propiedad/nombre-del-proyecto', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XVXJ2xtN",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-propiedad/nombre-del-proyecto\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Título Del Juego');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-propiedad/nombre-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-propiedad/nombre", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Px92HVep",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-propiedad/nombre\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-propiedad/separador-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-propiedad/separador", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("propiedad", {
        nombre: "Título"
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "orGb6+0o",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-propiedad/separador\",null,[[\"etiqueta\",\"propiedad\"],[\"name\",[25,[\"propiedad\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), "Nombre:");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-proyecto-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-proyecto', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fb0aL343",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-proyecto\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9PdhHdI8",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-proyecto\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-reiniciador-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-reiniciador', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kedsToUy",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-reiniciador\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-scroll-to-bottom-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-scroll-to-bottom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "iammjCfs",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-scroll-to-bottom\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WAVloGfr",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-scroll-to-bottom\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-selector-de-modo-zoom-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-selector-de-modo-zoom", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9qSCkI+9",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-selector-de-modo-zoom\",null,[[\"modoZoom\"],[1]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-skeleton-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas skeleton", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "4dSXWLoP",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-skeleton\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText(""); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "4o/cmcC2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-skeleton\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("template block text");
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-spinner-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-spinner", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "jO+8WapU",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-spinner\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-test-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas test", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9JVA5vkJ",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-test\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").exists();
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-tooltip-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas-tooltip", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XG4qqWf6",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-tooltip\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.textContent);
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-version-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)("Integration | Component | pilas version", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)("it renders", async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "aRm0aMFH",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-version\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.find)('*').textContent.indexOf("versión"));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas-zoom-de-canvas-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas-zoom-de-canvas', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "EzSksN31",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"pilas-zoom-de-canvas\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9RKlGgST",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-zoom-de-canvas\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/avanzar-y-conversion-de-grados-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | avanzar y conversion de grados", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 2);
      this.set("codigo", ``);
      this.set("cuandoInicia", pilas => {
        let actor = pilas.actores.aceituna(0, 0);
        assert.equal(actor.y, 0, "Está en la posición inicial.");
        actor.avanzar(90);
        assert.equal(actor.y, 1, "Avanzó un solo pixel.");
        actor.avanzar(0, 50);
        assert.equal(actor.y, 1, "Mantiene y=1.");
        assert.equal(actor.x, 50, "Avanzó 50 pixeles porque se movió en el ángulo 0.");
        assert.equal(pilas.utilidades.convertir_radianes_a_angulos(0), 0);
        assert.equal(pilas.utilidades.convertir_radianes_a_angulos(Math.PI), 180);
        assert.equal(pilas.utilidades.convertir_angulo_a_radianes(90), Math.PI / 2);
        assert.equal(pilas.utilidades.convertir_angulo_a_radianes(180), Math.PI);
      });
      this.set("cuandoTerminaLaEspera", pilas => {
        assert.equal(pilas.obtener_cantidad_de_actores(), 1);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/cambiar-centros-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | cambiar centros", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 2);
      this.set("codigo", ``);
      this.set("cuandoInicia", pilas => {
        let actor = pilas.actores.aceituna(0, 0);
        actor.centro_x = 1;
        actor.centro_y = 0;
        assert.equal(actor.centro_x, 1);
        assert.equal(actor.centro_y, 0);
        actor.centro_x = "centro";
        assert.equal(actor.centro_x, 0.5);
        actor.centro_x = "izquierda";
        assert.equal(actor.centro_x, 0);
        actor.centro_x = "derecha";
        assert.equal(actor.centro_x, 1);
        actor.centro_y = "medio";
        assert.equal(actor.centro_y, 0.5);
        actor.centro_y = "arriba";
        assert.equal(actor.centro_y, 0);
        actor.centro_y = "abajo";
        assert.equal(actor.centro_y, 1);
      });
      this.set("cuandoTerminaLaEspera", () => {
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/cambiar-posiciones-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | cambiar posiciones", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 2);
      this.set("codigo", ``);
      this.set("cuandoInicia", pilas => {
        let actor = pilas.actores.aceituna(0, 0);
        let actores = pilas.obtener_actores_en(0, 0);
        assert.equal(actores.length, 1, "Tiene que haber un actor");
        actores = pilas.obtener_actores_en(100, 100);
        assert.equal(actores.length, 0, "En esta posición no tiene que haber ni un solo actor");
        window["actor"] = actor;
      });
      this.set("cuandoTerminaLaEspera", pilas => {
        assert.equal(pilas.obtener_cantidad_de_actores(), 1);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/cambiar-rotacion-y-escala-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | cambiar rotación y escala", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 2);
      this.set("codigo", ``);
      this.set("cuandoInicia", pilas => {
        let actor = pilas.actores.aceituna(0, 0);
        actor.rotacion = 45;
        assert.equal(Math.round(actor.rotacion), 45, "Tiene que haber un actor.");
        actor.rotacion = 360 + 20;
        assert.equal(Math.round(actor.rotacion), 20, "Un angulo que supera 360 tiene un equivalente.");
        actor.rotacion = 390;
        assert.equal(Math.round(actor.rotacion), 30, "Un angulo de 390 grados tiene un equivalente de 30 grados.");
      });
      this.set("cuandoTerminaLaEspera", pilas => {
        assert.equal(pilas.obtener_cantidad_de_actores(), 1);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/cambiar-transparencia-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | cambiar transparencia", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 2);
      this.set("codigo", ``);
      this.set("cuandoInicia", pilas => {
        let actor = pilas.actores.aceituna(0, 0);
        actor.transparencia = 50;
        assert.equal(actor.transparencia, 50);
      });
      this.set("cuandoTerminaLaEspera", pilas => {
        assert.equal(pilas.obtener_cantidad_de_actores(), 1);
        assert.equal(pilas.obtener_actores()[0].transparencia, 50);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/contar-actores-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | contar actores", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 2);
      this.set("codigo", ``);
      this.set("cuandoInicia", pilas => {
        pilas.actores.caja(100, 200);
      });
      this.set("cuandoTerminaLaEspera", pilas => {
        assert.equal(pilas.obtener_cantidad_de_actores(), 1);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/convertir-coordenas-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | convertir coordenadas", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("cuandoInicia", pilas => {
        let coordenada = {};
        coordenada = pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(0, 0);
        assert.equal(coordenada.x, 175);
        assert.equal(coordenada.y, 175);
        coordenada = pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(350 / 2, 350 / 2);
        assert.equal(coordenada.x, 0);
        assert.equal(coordenada.y, 0);
        coordenada = pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(0, -200);
        assert.equal(coordenada.x, 175);
        assert.equal(coordenada.y, 200 + 175);
        coordenada = pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(300, 500);
        assert.equal(coordenada.x, -175 + 300);
        assert.equal(coordenada.y, -325);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "D6mOsf1G",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\"],[[25,[\"cuandoInicia\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/escenas-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | escenas", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("puede crear escenas y actores", async function (assert) {
      const done = assert.async();
      this.set("cuandoInicia", pilas => {
        assert.ok(pilas.escenas, "Existe el acceso a las escenas");
        assert.ok(pilas.escenas.Normal, "Existe la escena Normal");
        let escena = pilas.escenas.Normal();
        assert.equal(escena.actores.length, 0, "La escena comienza sin actores");
        pilas.actores.caja();
        assert.equal(escena.actores.length, 1, "El actor se agrega a la escena automáticamente");
        assert.equal(escena.id, pilas.escena_actual().id);
        escena = pilas.escenas.Normal();
        assert.equal(escena.actores.length, 0, "Al crear otra escena vuelve a estar limpia de actores");
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "D6mOsf1G",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\"],[[25,[\"cuandoInicia\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
    (0, _qunit.test)("puede crear escenas personalizadas", async function (assert) {
      const done = assert.async();
      this.set("proyecto", {
        titulo: "Proyecto para pilas-test",
        ancho: 500,
        alto: 500,
        codigos: {
          escenas: [{
            nombre: "principal",
            codigo: `class principal extends Escena {
              iniciar() {
              }

            }`
          }],
          actores: []
        },
        escenas: [{
          nombre: "principal",
          id: 1,
          camara_x: 0,
          camara_y: 0,
          actores: []
        }]
      });
      this.set("cuandoInicia", (pilas, contexto) => {
        assert.ok(pilas.escenas, "Existe el acceso a las escenas");
        pilas.escenas.vincular(contexto.__clases.principal);
        pilas.escenas.principal();
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "zGWICq9e",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"proyecto\"],[[25,[\"cuandoInicia\"]],[25,[\"proyecto\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/etiquetas-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | etiquetas", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 2);
      this.set("codigo", ``);
      let actor_caja = null;
      let actor_actor = null;
      let actor_demo = null;
      this.set("cuandoInicia", pilas => {
        actor_caja = pilas.actores.caja(100, 200);
        actor_actor = pilas.actores.actor(0, 0);
        actor_demo = pilas.actores.actor(10, 0);
        actor_demo.etiqueta = "personalizada";
      });
      this.set("cuandoTerminaLaEspera", () => {
        assert.equal(actor_caja.etiqueta, "caja");
        assert.equal(actor_actor.etiqueta, "actor");
        assert.equal(actor_demo.etiqueta, "personalizada");
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/habilidades-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | habilidades", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      const done = assert.async();
      this.set("espera", 3);
      this.set("codigo", ``);
      this.set("cuandoInicia", pilas => {
        let actor = pilas.actores.aceituna(0, 0);
        actor.imagen = "imagenes:enemigos/fantasma_asustando";
        actor.aprender("oscilar verticalmente");
        actor.aprender("oscilar rotacion");
        actor.aprender("oscilar transparencia");
        assert.equal(actor._habilidades.length, 3);
        actor.olvidar("oscilar transparencia");
        assert.equal(actor._habilidades.length, 2);
      });
      this.set("cuandoTerminaLaEspera", pilas => {
        let actor = pilas.obtener_actor_por_nombre("aceituna");
        actor.aprender("oscilar transparencia");
        assert.equal(actor._habilidades.length, 3);
        assert.equal(pilas.obtener_cantidad_de_actores(), 1);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kpDEM1s2",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"codigo\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],[25,[\"codigo\"]],[25,[\"espera\"]],[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/obtener-actores-por-etiqueta-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | obtener actores por etiquetas", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("puede obtener actores por etiquetas", async function (assert) {
      const done = assert.async();
      this.set("cuandoInicia", pilas => {
        let actor1 = pilas.actores.aceituna();
        let actor2 = pilas.actores.aceituna();
        actor1.etiqueta = "aceituna";
        actor2.etiqueta = "aceituna";
        actor1.x = -100;
        actor2.x = 100;
        let actor = pilas.obtener_actor_por_etiqueta("aceituna");
        assert.equal(actor.x, -100);
        let actores = pilas.obtener_todos_los_actores_con_la_etiqueta("aceituna");
        assert.equal(actores.length, 2);
        let vacío = pilas.obtener_todos_los_actores_con_la_etiqueta("etiqueta inexistente");
        assert.equal(vacío.length, 0);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "D6mOsf1G",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\"],[[25,[\"cuandoInicia\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/obtener-distancias-y-angulos-ente-puntos-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | obtener distancias y angulos entre puntos", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("puede calcular la distancia entre dos puntos", async function (assert) {
      const done = assert.async();
      this.set("cuandoInicia", pilas => {
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 0, 0, 0), 0);
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 10, 0, 10), 0);
        assert.equal(pilas.obtener_distancia_entre_puntos(-10, 0, -10, 0), 0);
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 10, 0, 0), 10);
        assert.equal(pilas.obtener_distancia_entre_puntos(10, 0, 0, 0), 10);
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 0, -10, 0), 10);
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 0, 0, 10), 10);
        let a = pilas.actores.aceituna();
        let b = pilas.actores.aceituna();
        b.x = 100;
        assert.equal(pilas.obtener_distancia_entre_actores(a, b), 100);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "D6mOsf1G",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\"],[[25,[\"cuandoInicia\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/obtener-numeros-aleatorios-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | obtener números aleatorios", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("puede calcular números aleatorios", async function (assert) {
      const done = assert.async();
      this.set("cuandoInicia", pilas => {
        for (let i = 0; i < 30; i++) {
          let numero = pilas.azar(0, 10);
          assert.ok(0 <= numero <= 10, "El número aleatorio entre 0 y 10 incluye los bordes");
        }

        let numero = pilas.azar(2, 2);
        assert.equal(numero, 2, "Si coinciden los extremos retorna el mismo número");
        assert.throws(function () {
          pilas.azar(100, -100);
        }, /Rango inválido/, "Muestra error de rango inválido");
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "D6mOsf1G",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\"],[[25,[\"cuandoInicia\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/puede-realizar-animaciones-de-propieades-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | puede realizar animación de propiedades", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("puede animar la rotación", async function (assert) {
      const done = assert.async();
      let actor = null;
      this.set("cuandoInicia", pilas => {
        actor = pilas.actores.aceituna();
        actor.imagen = "imagenes:nave/nave_enemiga_2";
        actor.animar().rotar(180);
      });
      this.set("cuandoTerminaLaEspera", () => {
        assert.equal(actor.rotacion, 180);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "eis3t7k9",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],3,[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
    (0, _qunit.test)("puede animar la escala", async function (assert) {
      const done = assert.async();
      let actor = null;
      this.set("cuandoInicia", pilas => {
        actor = pilas.actores.aceituna();
        actor.imagen = "imagenes:nave/nave_enemiga_2";
        actor.animar().escalar_hasta(2).escalar_hasta(1);
      });
      this.set("cuandoTerminaLaEspera", () => {
        assert.equal(actor.escala, 1);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XP+HWgJN",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],3.5,[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
    (0, _qunit.test)("puede animar la transparencia", async function (assert) {
      const done = assert.async();
      let actor = null;
      this.set("cuandoInicia", pilas => {
        actor = pilas.actores.aceituna();
        actor.imagen = "imagenes:nave/nave_enemiga_2";
        actor.animar().ocultar().mostrar();
      });
      this.set("cuandoTerminaLaEspera", () => {
        assert.equal(actor.transparencia, 0);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XP+HWgJN",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],3.5,[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/pilas/puede-realizar-un-recorrido-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Pilas | puede realizar un recorrido", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("puede realizar un recorrido", async function (assert) {
      const done = assert.async();
      let actor = null;
      this.set("cuandoInicia", pilas => {
        actor = pilas.actores.aceituna();
        actor.imagen = "imagenes:carreras/auto_rojo";
        actor.y = 300;
        actor.hacer_recorrido([0, 0, // a
        0, 100, // b
        -100, 100, //c
        100, 100, //d
        -100, 100, //e
        -150, 0, //f
        0, 0], 1.8, 1, true);
      });
      this.set("cuandoTerminaLaEspera", () => {
        assert.equal(actor.x, 0);
        assert.equal(actor.y, 0);
        done();
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "0+cgCthk",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"pilas-test\",null,[[\"cuandoInicia\",\"espera\",\"cuandoTerminaLaEspera\"],[[25,[\"cuandoInicia\"]],5,[25,[\"cuandoTerminaLaEspera\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  });
});
define("pilas-engine/tests/integration/components/ui/importar-imagen-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-intl/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)('Integration | Component | ui/importar-imagen', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupIntl)(hooks, "es");
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "G8A64CA3",
        "block": "{\"symbols\":[],\"statements\":[[1,[23,\"ui/importar-imagen\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element);
    });
  });
});
define("pilas-engine/tests/integration/helpers/etiqueta-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | etiqueta', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ietQsfoB",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"etiqueta\",[[25,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('1234');
    });
  });
});
define("pilas-engine/tests/integration/helpers/helper-animacion-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Helper | helper-animacion", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)("it renders", async function (assert) {
      this.set("inputValue", "caminar");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "5FTM2Zv0",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"helper-animacion\",[[25,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'this.animacion = "caminar";');
    });
  });
});
define("pilas-engine/tests/integration/helpers/helper-imagen-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("Integration | Helper | helper-imagen", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("inputValue", "imagenes:aliens/alien_azul");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ae+8jJYs",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"helper-imagen\",[[25,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'this.imagen = "imagenes:aliens/alien_azul";');
    });
  });
});
define("pilas-engine/tests/integration/helpers/nombre-de-imagen-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | nombreDeImagen', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "smgeNzXC",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"nombre-de-imagen\",[[25,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define("pilas-engine/tests/integration/helpers/plus-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("helper:plus", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("inputValue", "2");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WPR6nE5R",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"plus\",[[25,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("3");
    });
  });
});
define("pilas-engine/tests/integration/helpers/round-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("helper:round", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)("it renders", async function (assert) {
      this.set("inputValue", "15.444");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Zohm6gNr",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"round\",[[25,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("15.44");
    });
  });
});
define("pilas-engine/tests/integration/helpers/tiempo-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)("helper:tiempo", function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)("it renders", async function (assert) {
      this.set("inputValue", "88");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "VEMNcVfs",
        "block": "{\"symbols\":[],\"statements\":[[1,[29,\"tiempo\",[[25,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom("*").hasText("00 min 01 seg");
    });
  });
});
define("pilas-engine/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/abrir-selector-con-teclado.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/abrir-selector-con-teclado.js should pass ESLint\n\n');
  });
  QUnit.test('components/blockly-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/blockly-editor.js should pass ESLint\n\n');
  });
  QUnit.test('components/boton-ocultar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/boton-ocultar.js should pass ESLint\n\n');
  });
  QUnit.test('components/depurador-electron.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/depurador-electron.js should pass ESLint\n\n');
  });
  QUnit.test('components/en-electron.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/en-electron.js should pass ESLint\n\n');
  });
  QUnit.test('components/iniciar-proyecto/item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/iniciar-proyecto/item.js should pass ESLint\n\n');
  });
  QUnit.test('components/input-numero.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/input-numero.js should pass ESLint\n\n');
  });
  QUnit.test('components/item-de-la-lista-de-ejemplos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/item-de-la-lista-de-ejemplos.js should pass ESLint\n\n');
  });
  QUnit.test('components/monaco-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/monaco-editor.js should pass ESLint\n\n');
  });
  QUnit.test('components/panel-ocultable.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/panel-ocultable.js should pass ESLint\n\n');
  });
  QUnit.test('components/pantalla/iniciar-proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pantalla/iniciar-proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-acerca-de.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-acerca-de.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-animador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-animador.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-api.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-api.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-abrir.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-abrir.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-animaciones.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-animaciones.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-ayuda.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-ayuda.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-configuracion-del-canvas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-configuracion-del-canvas.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-configuracion-del-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-configuracion-del-editor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-copiar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-copiar.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-crear-carpeta.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-crear-carpeta.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-duplicar-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-duplicar-actor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-eliminar-con-confirmacion.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-eliminar-con-confirmacion.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-exportar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-exportar.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-importar-sonido.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-importar-sonido.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-login.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-menu-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-menu-actor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-miniatura-pulsable.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-miniatura-pulsable.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-miniatura.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-miniatura.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-para-colapsar-panel.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-para-colapsar-panel.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-principal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-principal.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-regresar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-regresar.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-renombrar-carpeta.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-renombrar-carpeta.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-renombrar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-renombrar.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-sonidos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-sonidos.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton-webserver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton-webserver.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-boton.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-boton.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-botones-para-deshacer-y-rehacer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-botones-para-deshacer-y-rehacer.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-canvas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-canvas.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-celda-de-actor-skeleton.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-celda-de-actor-skeleton.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-celda-de-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-celda-de-actor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-celda-de-imagen.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-celda-de-imagen.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-contenido-de-log.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-contenido-de-log.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-crear-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-crear-actor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-editor-header.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-editor-header.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-editor-panel-de-codigo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-editor-panel-de-codigo.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-editor-panel-de-juego-con-canvas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-editor-panel-de-juego-con-canvas.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-editor-panel-de-propiedades.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-editor-panel-de-propiedades.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-editor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-editor/boton-receta.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-editor/boton-receta.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-ejemplo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-ejemplo.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-ejemplos-es-nuevo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-ejemplos-es-nuevo.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-ejemplos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-ejemplos.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-esperar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-esperar.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-experimentos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-experimentos.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-explorador-de-proyectos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-explorador-de-proyectos.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-gestor-de-sonidos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-gestor-de-sonidos.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-grilla-de-actores.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-grilla-de-actores.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-grilla-de-imagenes.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-grilla-de-imagenes.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-header-exportacion.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-header-exportacion.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-icono.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-icono.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-indicador-de-errores.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-indicador-de-errores.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-indicador-inactivo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-indicador-inactivo.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-input-filtro.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-input-filtro.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-input-nombre-validado-de-laser.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-input-nombre-validado-de-laser.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-input-nombre-validado-de-sensor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-input-nombre-validado-de-sensor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-input-numero-con-deslizador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-input-numero-con-deslizador.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-inspector.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-inspector.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-inspector/actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-inspector/actor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-inspector/escena.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-inspector/escena.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-inspector/proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-inspector/proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-interprete.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-interprete.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-interruptor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-interruptor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-item-de-proyecto-en-el-explorador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-item-de-proyecto-en-el-explorador.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-link.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-link.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-lista-de-ejemplos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-lista-de-ejemplos.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-loader-del-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-loader-del-editor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-logo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-logo.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-manual.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-manual.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-mensaje-exportador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-mensaje-exportador.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-mini-icono.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-mini-icono.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-modal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-modal.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-mover-actor-de-escena.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-mover-actor-de-escena.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-navegar-ejemplos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-navegar-ejemplos.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-nombre-de-animacion.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-nombre-de-animacion.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-ordenable-horizontal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-ordenable-horizontal.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-paginador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-paginador.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-panel-de-escenas-en-modo-pausa.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-panel-de-escenas-en-modo-pausa.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-panel-de-escenas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-panel-de-escenas.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-panel-de-escenas/contenido-de-la-escena.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-panel-de-escenas/contenido-de-la-escena.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-panel-de-escenas/item-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-panel-de-escenas/item-actor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-panel-de-escenas/item-carpeta.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-panel-de-escenas/item-carpeta.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-panel-de-escenas/item-escena.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-panel-de-escenas/item-escena.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-portada.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-portada.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-previsualizacion-de-animacion.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-previsualizacion-de-animacion.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-previsualizacion-de-sonido.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-previsualizacion-de-sonido.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/cadena.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/cadena.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/combo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/combo.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/etiquetas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/etiquetas.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/fisica.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/fisica.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/habilidades.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/habilidades.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/imagen.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/imagen.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/interruptor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/interruptor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/lasers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/lasers.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/nombre-de-laser.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/nombre-de-laser.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/nombre-de-sensor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/nombre-de-sensor.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/nombre-del-proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/nombre-del-proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/nombre.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/nombre.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/numero.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/numero.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/sensores.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/sensores.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-propiedad/separador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-propiedad/separador.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-pruebas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-pruebas.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-receta-crear-estado.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-receta-crear-estado.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-reiniciador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-reiniciador.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-scroll-to-bottom.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-scroll-to-bottom.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-selector-de-animaciones.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-selector-de-animaciones.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-selector-de-color.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-selector-de-color.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-selector-de-grilla.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-selector-de-grilla.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-selector-de-idioma.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-selector-de-idioma.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-selector-de-modo-zoom.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-selector-de-modo-zoom.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-selector-de-zoom.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-selector-de-zoom.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-skeleton.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-skeleton.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-solapa-de-ayuda.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-solapa-de-ayuda.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-spinner.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-spinner.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-test.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-tooltip.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-tooltip.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-version.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-version.js should pass ESLint\n\n');
  });
  QUnit.test('components/pilas-zoom-de-canvas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-zoom-de-canvas.js should pass ESLint\n\n');
  });
  QUnit.test('components/selector-de-codigo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/selector-de-codigo.js should pass ESLint\n\n');
  });
  QUnit.test('components/ui/importar-imagen.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/ui/importar-imagen.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/acercade.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/acercade.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/actores.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/actores.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/editor.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/experimentos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/experimentos.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/explorar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/explorar.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/explorar/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/explorar/index.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/manual.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/manual.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/mis-juegos/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/mis-juegos/index.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('estados/estados-de-pilas-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'estados/estados-de-pilas-editor.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/animaciones-iniciales.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/animaciones-iniciales.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/proyecto-inicial-calle.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/proyecto-inicial-calle.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/proyecto-inicial-desde-cero.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/proyecto-inicial-desde-cero.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/proyecto-inicial-naves-minimo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/proyecto-inicial-naves-minimo.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/proyecto-inicial-plataformas-animado.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/proyecto-inicial-plataformas-animado.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/proyecto-inicial-plataformas-minimo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/proyecto-inicial-plataformas-minimo.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/proyecto-inicial-webserver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/proyecto-inicial-webserver.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/proyecto-inicial.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/proyecto-inicial.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/sonidos-iniciales.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/sonidos-iniciales.js should pass ESLint\n\n');
  });
  QUnit.test('fixtures/workspace-bloques-de-escena-nueva.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'fixtures/workspace-bloques-de-escena-nueva.js should pass ESLint\n\n');
  });
  QUnit.test('formats.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'formats.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/etiqueta.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/etiqueta.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/helper-animacion.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/helper-animacion.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/helper-detener-musica.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/helper-detener-musica.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/helper-imagen.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/helper-imagen.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/helper-reproducir-musica.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/helper-reproducir-musica.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/helper-sonido.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/helper-sonido.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/json.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/json.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/nombre-de-imagen.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/nombre-de-imagen.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/plus.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/plus.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/round.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/round.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/tiempo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/tiempo.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/acercade.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/acercade.js should pass ESLint\n\n');
  });
  QUnit.test('routes/api.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/api.js should pass ESLint\n\n');
  });
  QUnit.test('routes/app/abrir-proyecto-serializado.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/app/abrir-proyecto-serializado.js should pass ESLint\n\n');
  });
  QUnit.test('routes/app/abrir-proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/app/abrir-proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('routes/app/crear-proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/app/crear-proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('routes/app/editor/abandonar-proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/app/editor/abandonar-proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
  QUnit.test('routes/editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/editor.js should pass ESLint\n\n');
  });
  QUnit.test('routes/ejemplos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/ejemplos.js should pass ESLint\n\n');
  });
  QUnit.test('routes/ejemplos/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/ejemplos/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/ejemplos/ver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/ejemplos/ver.js should pass ESLint\n\n');
  });
  QUnit.test('routes/experimentos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/experimentos.js should pass ESLint\n\n');
  });
  QUnit.test('routes/explorar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/explorar.js should pass ESLint\n\n');
  });
  QUnit.test('routes/explorar/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/explorar/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/iniciar-proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/iniciar-proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('routes/manual.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/manual.js should pass ESLint\n\n');
  });
  QUnit.test('routes/mis-juegos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/mis-juegos.js should pass ESLint\n\n');
  });
  QUnit.test('routes/mis-juegos/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/mis-juegos/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/pilas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/pilas.js should pass ESLint\n\n');
  });
  QUnit.test('routes/proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('routes/pruebas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/pruebas.js should pass ESLint\n\n');
  });
  QUnit.test('services/actores.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/actores.js should pass ESLint\n\n');
  });
  QUnit.test('services/api.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/api.js should pass ESLint\n\n');
  });
  QUnit.test('services/bus.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/bus.js should pass ESLint\n\n');
  });
  QUnit.test('services/compilador.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/compilador.js should pass ESLint\n\n');
  });
  QUnit.test('services/ejemplos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/ejemplos.js should pass ESLint\n\n');
  });
  QUnit.test('services/electron.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/electron.js should pass ESLint\n\n');
  });
  QUnit.test('services/estadisticas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/estadisticas.js should pass ESLint\n\n');
  });
  QUnit.test('services/log.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/log.js should pass ESLint\n\n');
  });
  QUnit.test('services/memento.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/memento.js should pass ESLint\n\n');
  });
  QUnit.test('services/migraciones.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/migraciones.js should pass ESLint\n\n');
  });
  QUnit.test('services/proyecto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/proyecto.js should pass ESLint\n\n');
  });
  QUnit.test('services/recursos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/recursos.js should pass ESLint\n\n');
  });
  QUnit.test('services/sesion.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/sesion.js should pass ESLint\n\n');
  });
  QUnit.test('services/webserver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/webserver.js should pass ESLint\n\n');
  });
  QUnit.test('utils/aplicar-nombre.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/aplicar-nombre.js should pass ESLint\n\n');
  });
  QUnit.test('utils/autocompletar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/autocompletar.js should pass ESLint\n\n');
  });
  QUnit.test('utils/base64-encode.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/base64-encode.js should pass ESLint\n\n');
  });
  QUnit.test('utils/convertir-proyecto-ember-en-diccionario-simple.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/convertir-proyecto-ember-en-diccionario-simple.js should pass ESLint\n\n');
  });
  QUnit.test('utils/convertir-proyecto-en-objeto-ember.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/convertir-proyecto-en-objeto-ember.js should pass ESLint\n\n');
  });
  QUnit.test('utils/copiar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/copiar.js should pass ESLint\n\n');
  });
  QUnit.test('utils/json-a-string.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/json-a-string.js should pass ESLint\n\n');
  });
  QUnit.test('utils/obtener-contenido-en-base-64.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/obtener-contenido-en-base-64.js should pass ESLint\n\n');
  });
  QUnit.test('utils/obtener-nombre-sin-repetir.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/obtener-nombre-sin-repetir.js should pass ESLint\n\n');
  });
  QUnit.test('utils/obtener-plantilla-de-escena.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/obtener-plantilla-de-escena.js should pass ESLint\n\n');
  });
  QUnit.test('utils/preparar-codigo-para-el-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/preparar-codigo-para-el-editor.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/cambiar-la-posicion-del-actor-al-azar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/cambiar-la-posicion-del-actor-al-azar.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/clonar-cuando-hacen-click-sobre-el-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/clonar-cuando-hacen-click-sobre-el-actor.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/controlar-al-actor-como-si-fuera-un-automovil.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/controlar-al-actor-como-si-fuera-un-automovil.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/controlar-el-movimiento-del-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/controlar-el-movimiento-del-actor.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/crear-estado.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/crear-estado.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/cuando-colisiona-eliminar-al-otro-actor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/cuando-colisiona-eliminar-al-otro-actor.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/cuando-colisiona-emitir-mensaje.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/cuando-colisiona-emitir-mensaje.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/cuando-colisiona-explotar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/cuando-colisiona-explotar.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/detecta-el-paso-del-tiempo-en-segundos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/detecta-el-paso-del-tiempo-en-segundos.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/mover-al-actor-a-la-izquierda.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/mover-al-actor-a-la-izquierda.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/reproducir-sonido-al-comenzar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/reproducir-sonido-al-comenzar.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo.js should pass ESLint\n\n');
  });
  QUnit.test('utils/recetas/escena/observar-el-movimiento-del-mouse-o-cursor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/recetas/escena/observar-el-movimiento-del-mouse-o-cursor.js should pass ESLint\n\n');
  });
  QUnit.test('utils/string-a-json.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/string-a-json.js should pass ESLint\n\n');
  });
  QUnit.test('utils/utils.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/utils.js should pass ESLint\n\n');
  });
});
define("pilas-engine/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('pilas-engine/templates/acercade.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/acercade.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/api.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/api.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/app/abrir-proyecto-serializado.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/app/abrir-proyecto-serializado.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/app/abrir-proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/app/abrir-proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/app/crear-proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/app/crear-proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/app/editor/abandonar-proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/app/editor/abandonar-proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/application-error.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/application-error.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/application-loading.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/application-loading.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/abrir-selector-con-teclado.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/abrir-selector-con-teclado.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/blockly-editor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/blockly-editor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/boton-ocultar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/boton-ocultar.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/depurador-electron.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/depurador-electron.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/en-electron.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/en-electron.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/iniciar-proyecto/item.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/iniciar-proyecto/item.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/input-numero.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/input-numero.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/item-de-la-lista-de-ejemplos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/item-de-la-lista-de-ejemplos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/monaco-editor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/monaco-editor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/panel-ocultable.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/panel-ocultable.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pantalla/iniciar-proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pantalla/iniciar-proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-acerca-de.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-acerca-de.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-animador.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-animador.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-api.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-api.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-abrir.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-abrir.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-animaciones.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-animaciones.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-ayuda.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-ayuda.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-configuracion-del-canvas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-configuracion-del-canvas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-configuracion-del-editor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-configuracion-del-editor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-copiar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-copiar.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-crear-carpeta.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-crear-carpeta.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-duplicar-actor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-duplicar-actor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-eliminar-con-confirmacion.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-eliminar-con-confirmacion.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-exportar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-exportar.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-importar-sonido.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-importar-sonido.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-login.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-login.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-menu-actor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-menu-actor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-miniatura-pulsable.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-miniatura-pulsable.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-miniatura.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-miniatura.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-para-colapsar-panel.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-para-colapsar-panel.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-principal.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-principal.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-regresar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-regresar.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-renombrar-carpeta.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-renombrar-carpeta.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-renombrar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-renombrar.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-sonidos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-sonidos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton-webserver.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton-webserver.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-boton.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-boton.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-botones-para-deshacer-y-rehacer.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-botones-para-deshacer-y-rehacer.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-canvas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-canvas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-celda-de-actor-skeleton.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-celda-de-actor-skeleton.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-celda-de-actor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-celda-de-actor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-celda-de-imagen.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-celda-de-imagen.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-contenido-de-log.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-contenido-de-log.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-crear-actor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-crear-actor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-editor-header.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-editor-header.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-editor-panel-de-codigo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-editor-panel-de-codigo.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-editor-panel-de-juego-con-canvas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-editor-panel-de-juego-con-canvas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-editor-panel-de-propiedades.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-editor-panel-de-propiedades.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-editor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-editor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-editor/boton-receta.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-editor/boton-receta.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-ejemplo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-ejemplo.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-ejemplos-es-nuevo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-ejemplos-es-nuevo.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-ejemplos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-ejemplos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-esperar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-esperar.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-experimentos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-experimentos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-explorador-de-proyectos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-explorador-de-proyectos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-gestor-de-sonidos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-gestor-de-sonidos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-grilla-de-actores.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-grilla-de-actores.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-grilla-de-imagenes.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-grilla-de-imagenes.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-header-exportacion.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-header-exportacion.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-icono.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-icono.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-indicador-de-errores.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-indicador-de-errores.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-indicador-inactivo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-indicador-inactivo.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-input-filtro.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-input-filtro.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-input-nombre-validado-de-laser.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-input-nombre-validado-de-laser.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-input-nombre-validado-de-sensor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-input-nombre-validado-de-sensor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-input-numero-con-deslizador.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-input-numero-con-deslizador.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-inspector.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-inspector.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-inspector/actor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-inspector/actor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-inspector/escena.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-inspector/escena.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-inspector/proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-inspector/proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-interprete.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-interprete.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-interruptor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-interruptor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-item-de-proyecto-en-el-explorador.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-item-de-proyecto-en-el-explorador.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-link.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-link.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-lista-de-ejemplos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-lista-de-ejemplos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-loader-del-editor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-loader-del-editor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-logo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-logo.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-manual.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-manual.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-mensaje-exportador.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-mensaje-exportador.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-mini-icono.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-mini-icono.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-modal.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-modal.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-mover-actor-de-escena.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-mover-actor-de-escena.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-navegar-ejemplos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-navegar-ejemplos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-nombre-de-animacion.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-nombre-de-animacion.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-ordenable-horizontal.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-ordenable-horizontal.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-paginador.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-paginador.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-panel-de-escenas-en-modo-pausa.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-panel-de-escenas-en-modo-pausa.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-panel-de-escenas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-panel-de-escenas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-panel-de-escenas/contenido-de-la-escena.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-panel-de-escenas/contenido-de-la-escena.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-panel-de-escenas/item-actor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-panel-de-escenas/item-actor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-panel-de-escenas/item-carpeta.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-panel-de-escenas/item-carpeta.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-panel-de-escenas/item-escena.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-panel-de-escenas/item-escena.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-portada.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-portada.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-previsualizacion-de-animacion.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-previsualizacion-de-animacion.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-previsualizacion-de-sonido.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-previsualizacion-de-sonido.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/cadena.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/cadena.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/combo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/combo.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/etiquetas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/etiquetas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/fisica.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/fisica.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/habilidades.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/habilidades.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/imagen.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/imagen.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/interruptor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/interruptor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/lasers.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/lasers.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/nombre-de-laser.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/nombre-de-laser.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/nombre-de-sensor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/nombre-de-sensor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/nombre-del-proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/nombre-del-proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/nombre.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/nombre.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/numero.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/numero.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/sensores.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/sensores.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-propiedad/separador.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-propiedad/separador.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-pruebas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-pruebas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-receta-crear-estado.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-receta-crear-estado.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-reiniciador.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-reiniciador.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-scroll-to-bottom.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-scroll-to-bottom.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-selector-de-animaciones.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-selector-de-animaciones.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-selector-de-color.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-selector-de-color.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-selector-de-grilla.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-selector-de-grilla.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-selector-de-idioma.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-selector-de-idioma.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-selector-de-modo-zoom.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-selector-de-modo-zoom.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-selector-de-zoom.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-selector-de-zoom.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-skeleton.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-skeleton.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-solapa-de-ayuda.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-solapa-de-ayuda.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-spinner.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-spinner.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-test.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-test.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-tooltip.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-tooltip.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-version.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-version.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/pilas-zoom-de-canvas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/pilas-zoom-de-canvas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/selector-de-codigo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/selector-de-codigo.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/components/ui/importar-imagen.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/components/ui/importar-imagen.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/editor.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/editor.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/ejemplos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/ejemplos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/ejemplos/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/ejemplos/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/ejemplos/ver.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/ejemplos/ver.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/experimentos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/experimentos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/explorar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/explorar.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/explorar/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/explorar/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/iniciar-proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/iniciar-proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/manual.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/manual.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/mis-juegos.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/mis-juegos.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/mis-juegos/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/mis-juegos/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/pilas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/pilas.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/proyecto.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/proyecto.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('pilas-engine/templates/pruebas.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pilas-engine/templates/pruebas.hbs should pass TemplateLint.\n\n');
  });
});
define("pilas-engine/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/puede-eliminar-escenas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/puede-eliminar-escenas-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/puede-ingresar-al-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/puede-ingresar-al-editor-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/puede-ingresar-en-la-seccion-pruebas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/puede-ingresar-en-la-seccion-pruebas-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/puede-visitar-cada-uno-de-los-ejemplos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/puede-visitar-cada-uno-de-los-ejemplos-test.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/esperar-elemento.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/esperar-elemento.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/esperar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/esperar.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/pulsar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/pulsar.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/abrir-selector-con-teclado-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/abrir-selector-con-teclado-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/boton-ocultar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/boton-ocultar-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/depurador-electron-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/depurador-electron-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/en-electron-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/en-electron-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/iniciar-proyecto/item-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/iniciar-proyecto/item-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/input-numero-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/input-numero-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/panel-ocultable-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/panel-ocultable-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pantalla/iniciar-proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pantalla/iniciar-proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-api-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-api-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-copiar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-copiar-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-duplicar-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-duplicar-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-exportar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-exportar-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-menu-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-menu-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-miniatura-pulsable-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-miniatura-pulsable-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-miniatura-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-miniatura-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-principal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-principal-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-regresar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-regresar-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-renombrar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-renombrar-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-boton-webserver-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-boton-webserver-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-celda-de-actor-skeleton-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-celda-de-actor-skeleton-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-celda-de-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-celda-de-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-celda-de-imagen-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-celda-de-imagen-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-contenido-de-log-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-contenido-de-log-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-crear-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-crear-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-editor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-editor/boton-receta-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-editor/boton-receta-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-ejemplo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-ejemplo-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-ejemplos-es-nuevo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-ejemplos-es-nuevo-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-esperar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-esperar-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-experimentos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-experimentos-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-grilla-de-actores-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-grilla-de-actores-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-grilla-de-imagenes-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-grilla-de-imagenes-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-icono-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-icono-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-input-filtro-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-input-filtro-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-inspector-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-inspector-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-inspector/actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-inspector/actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-inspector/escena-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-inspector/escena-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-inspector/proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-inspector/proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-interprete-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-interprete-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-interruptor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-interruptor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-link-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-link-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-lista-de-ejemplos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-lista-de-ejemplos-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-loader-del-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-loader-del-editor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-logo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-logo-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-mensaje-exportador-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-mensaje-exportador-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-modal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-modal-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-navegar-ejemplos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-navegar-ejemplos-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-panel-de-escenas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-panel-de-escenas-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-panel-de-escenas/item-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-panel-de-escenas/item-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-panel-de-escenas/item-carpeta-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-panel-de-escenas/item-carpeta-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-propiedad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-propiedad-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-propiedad/combo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-propiedad/combo-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-propiedad/habilidades-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-propiedad/habilidades-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-propiedad/interruptor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-propiedad/interruptor-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-propiedad/nombre-del-proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-propiedad/nombre-del-proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-propiedad/nombre-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-propiedad/nombre-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-propiedad/separador-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-propiedad/separador-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-reiniciador-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-reiniciador-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-scroll-to-bottom-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-scroll-to-bottom-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-selector-de-modo-zoom-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-selector-de-modo-zoom-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-skeleton-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-skeleton-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-spinner-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-spinner-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-test-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-test-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-tooltip-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-tooltip-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-version-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-version-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas-zoom-de-canvas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-zoom-de-canvas-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/avanzar-y-conversion-de-grados-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/avanzar-y-conversion-de-grados-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/cambiar-centros-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/cambiar-centros-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/cambiar-posiciones-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/cambiar-posiciones-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/cambiar-rotacion-y-escala-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/cambiar-rotacion-y-escala-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/cambiar-transparencia-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/cambiar-transparencia-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/contar-actores-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/contar-actores-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/convertir-coordenas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/convertir-coordenas-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/escenas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/escenas-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/etiquetas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/etiquetas-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/habilidades-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/habilidades-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/obtener-actores-por-etiqueta-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/obtener-actores-por-etiqueta-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/obtener-distancias-y-angulos-ente-puntos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/obtener-distancias-y-angulos-ente-puntos-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/obtener-numeros-aleatorios-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/obtener-numeros-aleatorios-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/puede-realizar-animaciones-de-propieades-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/puede-realizar-animaciones-de-propieades-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/pilas/puede-realizar-un-recorrido-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas/puede-realizar-un-recorrido-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/ui/importar-imagen-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/ui/importar-imagen-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/etiqueta-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/etiqueta-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/helper-animacion-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/helper-animacion-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/helper-imagen-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/helper-imagen-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/nombre-de-imagen-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/nombre-de-imagen-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/plus-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/plus-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/round-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/round-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/tiempo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/tiempo-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/explorar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/explorar-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/explorar/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/explorar/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/mis-juegos/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/mis-juegos/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/helpers/json-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/json-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/app/abrir-proyecto-serializado-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/app/abrir-proyecto-serializado-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/app/abrir-proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/app/abrir-proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/app/crear-proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/app/crear-proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/app/editor/abandonar-proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/app/editor/abandonar-proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/explorar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/explorar-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/explorar/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/explorar/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/iniciar-proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/iniciar-proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/mis-juegos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/mis-juegos-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/mis-juegos/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/mis-juegos/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/actores-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/actores-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/api-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/api-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/bus-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/bus-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/compilador-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/compilador-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/ejemplos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/ejemplos-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/electron-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/electron-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/estadisticas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/estadisticas-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/log-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/log-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/memento-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/memento-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/migraciones-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/migraciones-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/proyecto-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/proyecto-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/sesion-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/sesion-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/webserver-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/webserver-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/aplicar-nombre-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/aplicar-nombre-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/autocompletar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/autocompletar-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/convertir-proyecto-en-objeto-ember-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/convertir-proyecto-en-objeto-ember-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/json-a-string-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/json-a-string-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/obtener-nombre-sin-repetir-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/obtener-nombre-sin-repetir-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/obtener-plantilla-de-escena-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/obtener-plantilla-de-escena-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/preparar-codigo-para-el-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/preparar-codigo-para-el-editor-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/cambiar-la-posicion-del-actor-al-azar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/cambiar-la-posicion-del-actor-al-azar-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/clonar-cuando-hacen-click-sobre-el-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/clonar-cuando-hacen-click-sobre-el-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/controlar-al-actor-como-si-fuera-un-automovil-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/controlar-al-actor-como-si-fuera-un-automovil-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/controlar-el-movimiento-del-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/controlar-el-movimiento-del-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/cuando-colisiona-eliminar-al-otro-actor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/cuando-colisiona-eliminar-al-otro-actor-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/cuando-colisiona-emitir-mensaje-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/cuando-colisiona-emitir-mensaje-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/detecta-el-paso-del-tiempo-en-segundos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/detecta-el-paso-del-tiempo-en-segundos-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/mover-al-actor-a-la-izquierda-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/mover-al-actor-a-la-izquierda-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/reproducir-sonido-al-comenzar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/reproducir-sonido-al-comenzar-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/recetas/escena/observar-el-movimiento-del-mouse-o-cursor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/recetas/escena/observar-el-movimiento-del-mouse-o-cursor-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/utils/string-a-json-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/string-a-json-test.js should pass ESLint\n\n');
  });
});
define("pilas-engine/tests/test-helper", ["pilas-engine/app", "pilas-engine/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("pilas-engine/tests/unit/controllers/explorar-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | explorar', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:explorar');
      assert.ok(controller);
    });
  });
});
define("pilas-engine/tests/unit/controllers/explorar/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | explorar/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:explorar/index');
      assert.ok(controller);
    });
  });
});
define("pilas-engine/tests/unit/controllers/mis-juegos/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | mis-juegos/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:mis-juegos/index');
      assert.ok(controller);
    });
  });
});
define("pilas-engine/tests/unit/helpers/json-test", ["pilas-engine/helpers/json", "qunit"], function (_json, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | json', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _json.json)([42]);
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/routes/app/abrir-proyecto-serializado-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | app/abrir_proyecto_serializado', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:app/abrir-proyecto-serializado');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/app/abrir-proyecto-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | app/abrir_proyecto', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:app/abrir-proyecto');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/app/crear-proyecto-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | app/crear_proyecto', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:app/crear-proyecto');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/app/editor/abandonar-proyecto-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | app/editor/abandonar-proyecto', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:app/editor/abandonar-proyecto');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/explorar-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | explorar', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:explorar');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/explorar/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | explorar/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:explorar/index');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/iniciar-proyecto-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | iniciar-proyecto', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:iniciar-proyecto');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/mis-juegos-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | mis-juegos', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:mis-juegos');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/mis-juegos/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | mis-juegos/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:mis-juegos/index');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/routes/proyecto-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | proyecto', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:proyecto');
      assert.ok(route);
    });
  });
});
define("pilas-engine/tests/unit/services/actores-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | actores', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:actores');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/api-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | api', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:api');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/bus-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | bus', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:bus');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/compilador-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)("Unit | Service | compilador", function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    function eliminar_espacios(str) {
      return str.replace(/\s\s+/g, " ").trim();
    }

    (0, _qunit.test)("puede convertir código TypeScript a JavaScript", function (assert) {
      let proyecto = {};
      let compilador = this.owner.lookup("service:compilador");
      assert.ok(compilador);
      let resultado = compilador.compilar(`class Actor {}`, proyecto);
      let codigoEsperado = `
      var Actor = /** @class */ (function () {
        function Actor() {
        }
        return Actor;
      }());
    `;
      assert.equal(eliminar_espacios(resultado.codigo), eliminar_espacios(codigoEsperado));
      resultado = compilador.compilar(`class MiActor extends Actor {}`, proyecto);
      assert.ok(resultado.codigo.indexOf("@class") > -1);
    });
    (0, _qunit.test)("puede instrumentar una sentencia simple", function (assert) {
      let compilador = this.owner.lookup("service:compilador");
      assert.ok(compilador); // Prueba que a una linea de código sencilla con una sentencia se
      // le aplique el instrumentado de código.

      let entrada = `
      this.impulsar(10, 0);
    `;
      let salida_esperada = `
      if (this.pilas) { this.pilas.notificar_traza_de_ejecucion(this.id, 2) }
      this.impulsar(10, 0);
    `;
      let resultado = compilador.instrumentar_codigo_de_actor({
        codigo: entrada
      });
      assert.equal(eliminar_espacios(resultado), eliminar_espacios(salida_esperada));
    });
    (0, _qunit.test)("puede instrumentar un método", function (assert) {
      let compilador = this.owner.lookup("service:compilador");
      assert.ok(compilador); // Prueba que a una linea de código sencilla con una sentencia se
      // le aplique el instrumentado de código.

      let entrada = `
      class plataforma extends Actor {
        iniciar() {
          console.log("asdasd");
        }
      }
    `;
      let salida_esperada = `
      class plataforma extends Actor {
          iniciar() {
              if (this.pilas) { this.pilas.notificar_traza_de_ejecucion(this.id, 3) }
              if (this.pilas) { this.pilas.notificar_traza_de_ejecucion(this.id, 4) }
              console.log("asdasd");
          }
      }
    `;
      let resultado = compilador.instrumentar_codigo_de_actor({
        codigo: entrada
      });
      assert.equal(eliminar_espacios(resultado), eliminar_espacios(salida_esperada));
    });
  });
});
define("pilas-engine/tests/unit/services/ejemplos-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | ejemplos', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:ejemplos');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/electron-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | electron', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:electron');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/estadisticas-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | estadisticas', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:estadisticas');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/log-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)("Unit | Service | log", function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)("it exists", function (assert) {
      let service = this.owner.lookup("service:log");
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/memento-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | memento', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:memento');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/migraciones-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | migraciones', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:migraciones');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/proyecto-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | proyecto', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:proyecto');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/sesion-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | sesion', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:sesion');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/services/webserver-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | webserver', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:webserver');
      assert.ok(service);
    });
  });
});
define("pilas-engine/tests/unit/utils/aplicar-nombre-test", ["pilas-engine/utils/aplicar-nombre", "qunit"], function (_aplicarNombre, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | aplicar nombre", function () {
    (0, _qunit.test)("it works", function (assert) {
      let result = (0, _aplicarNombre.default)("Demo", `class UnaClase extends Actor ...`);
      assert.equal(result, "class Demo extends Actor ...");
    });
  });
});
define("pilas-engine/tests/unit/utils/autocompletar-test", ["pilas-engine/utils/autocompletar", "qunit"], function (_autocompletar, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | autocompletar", function () {
    (0, _qunit.test)("autocompletar simple", function (assert) {
      let contexto = {
        window: {},
        console: {},
        pilas: {
          actores: {
            Actor: function () {},
            Aceituna: function () {}
          },
          actualizar: function () {}
        },
        actor: {},
        actores: {}
      };
      assert.deepEqual((0, _autocompletar.default)(contexto, "pi"), ["pilas"]);
      assert.deepEqual((0, _autocompletar.default)(contexto, "pilas.actor"), ["pilas.actores"]);
      assert.deepEqual((0, _autocompletar.default)(contexto, "pilas.ac"), ["pilas.actores", "pilas.actualizar"]);
      assert.deepEqual((0, _autocompletar.default)(contexto, "pilas.actores.Ac"), ["pilas.actores.Actor", "pilas.actores.Aceituna"]);
      assert.deepEqual((0, _autocompletar.default)(contexto, "acto"), ["actor", "actores"]);
    });
    (0, _qunit.test)("autocompletar cuando varias variables tienen el mismo comienzo", function (assert) {
      let contexto = {
        actor: {
          a: 1
        },
        actores: {
          b: 1
        },
        demo: {
          c: 1
        }
      };
      assert.deepEqual((0, _autocompletar.default)(contexto, "actor"), ["actor", "actores"]);
    });
    (0, _qunit.test)("autocompletar si termina con punto", function (assert) {
      let contexto = {
        window: {},
        console: {},
        pilas: {
          actores: {
            Actor: function () {},
            Aceituna: function () {}
          },
          actualizar: function () {}
        },
        actor: {},
        actores: {}
      };
      assert.deepEqual((0, _autocompletar.default)(contexto, "pilas."), ["pilas.actores", "pilas.actualizar"]);
    });
  });
});
define("pilas-engine/tests/unit/utils/convertir-proyecto-en-objeto-ember-test", ["pilas-engine/utils/convertir-proyecto-en-objeto-ember", "qunit"], function (_convertirProyectoEnObjetoEmber, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | convertirProyectoEnObjetoEmber", function () {
    // Replace this with your real tests.
    (0, _qunit.test)("it works", function (assert) {
      let result = (0, _convertirProyectoEnObjetoEmber.default)({
        nombre: "demo",
        escenas: [],
        codigos: {
          escenas: [],
          actores: []
        }
      });
      assert.ok(result.get("nombre") === "demo");
    });
  });
});
define("pilas-engine/tests/unit/utils/json-a-string-test", ["pilas-engine/utils/json-a-string", "qunit"], function (_jsonAString, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | json a string", function () {
    // Replace this with your real tests.
    (0, _qunit.test)("it works", function (assert) {
      let result = (0, _jsonAString.default)({
        demo: 123
      });
      assert.ok(result);
      assert.equal(result, "eyJkZW1vIjoxMjN9");
    });
  });
});
define("pilas-engine/tests/unit/utils/obtener-nombre-sin-repetir-test", ["pilas-engine/utils/obtener-nombre-sin-repetir", "qunit"], function (_obtenerNombreSinRepetir, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | obtener nombre sin repetir", function () {
    (0, _qunit.test)("it works", function (assert) {
      let result = (0, _obtenerNombreSinRepetir.default)(["Actor"], "Demo");
      assert.equal(result, "Demo");
      result = (0, _obtenerNombreSinRepetir.default)(["Actor"], "Actor");
      assert.equal(result, "Actor1");
    });
  });
});
define("pilas-engine/tests/unit/utils/obtener-plantilla-de-escena-test", ["pilas-engine/utils/obtener-plantilla-de-escena", "qunit"], function (_obtenerPlantillaDeEscena, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | obtener plantilla de escena", function () {
    // Replace this with your real tests.
    (0, _qunit.test)("it works", function (assert) {
      let result = (0, _obtenerPlantillaDeEscena.default)();
      assert.ok(result.indexOf("class") > -1);
      assert.ok(result.indexOf("extends Escena") > -1);
    });
  });
});
define("pilas-engine/tests/unit/utils/preparar-codigo-para-el-editor-test", ["pilas-engine/utils/preparar-codigo-para-el-editor", "qunit"], function (_prepararCodigoParaElEditor, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | preparar_codigo_para_el_editor", function () {
    // Replace this with your real tests.
    (0, _qunit.test)("it works", function (assert) {
      let result = (0, _prepararCodigoParaElEditor.default)("class demo {}");
      assert.equal(result, "// @ts-ignore\nclass demo {}");
      let result2 = (0, _prepararCodigoParaElEditor.default)(`class demo {
    propiedades = {
      test: 123
    };
    iniciar() {}
}`);
      assert.equal(result2, "// @ts-ignore\nclass demo {\n    iniciar() {}\n}");
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/cambiar-la-posicion-del-actor-al-azar-test", ["pilas-engine/utils/recetas/actor/cambiar-la-posicion-del-actor-al-azar", "qunit"], function (_cambiarLaPosicionDelActorAlAzar, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/cambiar-la-posicion-del-actor-al-azar', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _cambiarLaPosicionDelActorAlAzar.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/clonar-cuando-hacen-click-sobre-el-actor-test", ["pilas-engine/utils/recetas/actor/clonar-cuando-hacen-click-sobre-el-actor", "qunit"], function (_clonarCuandoHacenClickSobreElActor, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/clonar-cuando-hacen-click-sobre-el-actor', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _clonarCuandoHacenClickSobreElActor.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/controlar-al-actor-como-si-fuera-un-automovil-test", ["pilas-engine/utils/recetas/actor/controlar-al-actor-como-si-fuera-un-automovil", "qunit"], function (_controlarAlActorComoSiFueraUnAutomovil, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/controlar-al-actor-como-si-fuera-un-automovil', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _controlarAlActorComoSiFueraUnAutomovil.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/controlar-el-movimiento-del-actor-test", ["pilas-engine/utils/recetas/actor/controlar-el-movimiento-del-actor", "qunit"], function (_controlarElMovimientoDelActor, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/controlar-el-movimiento-del-actor', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _controlarElMovimientoDelActor.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/cuando-colisiona-eliminar-al-otro-actor-test", ["pilas-engine/utils/recetas/actor/cuando-colisiona-eliminar-al-otro-actor", "qunit"], function (_cuandoColisionaEliminarAlOtroActor, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/cuando-colisiona-eliminar-al-otro-actor', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _cuandoColisionaEliminarAlOtroActor.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/cuando-colisiona-emitir-mensaje-test", ["pilas-engine/utils/recetas/actor/cuando-colisiona-emitir-mensaje", "qunit"], function (_cuandoColisionaEmitirMensaje, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/cuando-colisiona-emitir-mensaje', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _cuandoColisionaEmitirMensaje.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/detecta-el-paso-del-tiempo-en-segundos-test", ["pilas-engine/utils/recetas/actor/detecta-el-paso-del-tiempo-en-segundos", "qunit"], function (_detectaElPasoDelTiempoEnSegundos, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/detecta-el-paso-del-tiempo-en-segundos', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _detectaElPasoDelTiempoEnSegundos.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/mover-al-actor-a-la-izquierda-test", ["pilas-engine/utils/recetas/actor/mover-al-actor-a-la-izquierda", "qunit"], function (_moverAlActorALaIzquierda, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/mover-al-actor-a-la-izquierda', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _moverAlActorALaIzquierda.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/reproducir-sonido-al-comenzar-test", ["pilas-engine/utils/recetas/actor/reproducir-sonido-al-comenzar", "qunit"], function (_reproducirSonidoAlComenzar, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/reproducir-sonido-al-comenzar', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _reproducirSonidoAlComenzar.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla-test", ["pilas-engine/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla", "qunit"], function (_saltarOImpulsarCuandoHacenClickEnLaPantalla, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _saltarOImpulsarCuandoHacenClickEnLaPantalla.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-test", ["pilas-engine/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click", "qunit"], function (_saltarOImpulsarCuandoHacenClick, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/actor/saltar-o-impulsar-cuando-hacen-click', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _saltarOImpulsarCuandoHacenClick.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza-test", ["pilas-engine/utils/recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza", "qunit"], function (_crear10ActoresEnPosicionesAlAzarCuandoComienza, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _crear10ActoresEnPosicionesAlAzarCuandoComienza.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click-test", ["pilas-engine/utils/recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click", "qunit"], function (_crearActorEnLaPosicionEnDondeSeHaceClick, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _crearActorEnLaPosicionEnDondeSeHaceClick.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos-test", ["pilas-engine/utils/recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos", "qunit"], function (_crearActoresCadaDeterminadoTiempoEnSegundos, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _crearActoresCadaDeterminadoTiempoEnSegundos.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo-test", ["pilas-engine/utils/recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo", "qunit"], function (_crearCopiasDeUnActorCadaDeterminadoTiempo, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _crearCopiasDeUnActorCadaDeterminadoTiempo.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/recetas/escena/observar-el-movimiento-del-mouse-o-cursor-test", ["pilas-engine/utils/recetas/escena/observar-el-movimiento-del-mouse-o-cursor", "qunit"], function (_observarElMovimientoDelMouseOCursor, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | recetas/escena/observar-el-movimiento-del-mouse-o-cursor', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _observarElMovimientoDelMouseOCursor.default)();
      assert.ok(result);
    });
  });
});
define("pilas-engine/tests/unit/utils/string-a-json-test", ["pilas-engine/utils/string-a-json", "qunit"], function (_stringAJson, _qunit) {
  "use strict";

  (0, _qunit.module)("Unit | Utility | string a json", function () {
    // Replace this with your real tests.
    (0, _qunit.test)("it works", function (assert) {
      let result = (0, _stringAJson.default)("eyJkZW1vIjoxMjN9");
      assert.ok(result);
      assert.equal(result.demo, 123);
    });
  });
});
define('pilas-engine/config/environment', [], function() {
  var prefix = 'pilas-engine';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('pilas-engine/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map

function categoria(nombre, bloques) {
    return {
        kind: "category",
        name: nombre,
        contents: bloques,
    };
}
function bloque(nombre) {
    return {
        kind: "block",
        type: nombre
    };
}
function variables() {
    return {
        kind: "category",
        name: "Змінні",
        custom: "VARIABLE",
    };
}
function procedimientos() {
    return {
        kind: "category",
        name: "Функції",
        custom: "PROCEDURE",
    };
}
function categoria_camara() {
    return categoria("Камера", [
        bloque("camara_fijar_x"),
        bloque("camara_fijar_y"),
        bloque("camara_vibrar"),
        bloque("camara_desplazar_horizontalmente"),
        bloque("camara_desplazar_verticalmente"),
    ]);
}
function categoria_control() {
    return {
        kind: "category",
        name: "Логіка",
        contents: [
            {
                kind: "block",
                type: "controls_if",
            },
            {
                kind: "block",
                type: "logic_compare",
            },
            {
                kind: "block",
                type: "logic_operation",
            },
            {
                kind: "block",
                type: "logic_boolean",
            },
            bloque("control_tecla"),
        ],
    };
}
function categoria_audio() {
    return categoria("Звук", [
        bloque("audio_reproducir_sonido"),
        bloque("audio_reproducir_musica"),
        bloque("audio_detener_musica"),
    ]);
}
function generar_toolbox() {
    return {
        actor: [
            categoria("Дії", [
                bloque("actor_decir"),
                bloque("actor_saltar"),
                bloque("actor_impulsar"),
                bloque("actor_desplazar"),
                bloque("actor_reiniciar"),
                bloque("actor_reproducir_animacion"),
            ]),
            categoria("Події", [
                bloque("actor_inicia"),
                bloque("actor_cuando_hace_click"),
                bloque("actor_cuando_hace_click_en_la_pantalla"),
                bloque("actor_actualizar"),
                bloque("actor_cada_segundo"),
            ]),
            categoria_control(),
            categoria_camara(),
            categoria_audio(),
            variables(),
            procedimientos(),
        ],
        escena: [
            categoria("Миша", [
                bloque("pilas_cursor_x"),
                bloque("pilas_cursor_y"),
            ]),
            categoria("Події", [
                bloque("escena_al_iniciar"),
                bloque("escena_cuando_hace_click"),
                bloque("escena_al_actualizar"),
                bloque("escena_cada_segundo"),
            ]),
            categoria_control(),
            categoria_camara(),
            categoria_audio(),
            variables(),
            procedimientos(),
        ],
        proyecto: [],
    };
}
var toolbox_de_bloques_compilados = generar_toolbox();
Blockly.Blocks["actor_actualizar"] = {
    init: function () {
        this.appendDummyInput().appendField("При оновленні");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_actualizar"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "actor._bloques_actualizar = function() {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["actor_cada_segundo"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Щосекунди");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_cada_segundo"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "actor._bloques_cada_segundo = function(segundos_transcurridos) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["actor_cuando_hace_click"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("По кліку");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_cuando_hace_click"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "\n\n  actor._bloques_cuando_hace_click = function(x, y, evento) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["actor_cuando_hace_click_en_la_pantalla"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Коли ви клікаєте по екрану");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_cuando_hace_click_en_la_pantalla"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "\n\n  actor._bloques_cuando_hace_click_en_la_pantalla = function(x, y, evento) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["actor_decir"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Повідомлення")
            .appendField(new Blockly.FieldTextInput("Hello!"), "NAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_decir"] = function (block) {
    var value_name = block.getFieldValue("NAME");
    var code = "this.decir(\"" + value_name + "\");\n";
    return code;
};
Blockly.Blocks["actor_desplazar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Зміщення на X")
            .appendField(new Blockly.FieldNumber(1, -300, 300), "x")
            .appendField("і Y")
            .appendField(new Blockly.FieldNumber(2, -300, 300), "y");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_desplazar"] = function (block) {
    var number_x = block.getFieldValue("x");
    var number_y = block.getFieldValue("y");
    var code = "this.x += " + number_x + ";\nthis.y += " + number_y + ";\n";
    return code;
};
Blockly.Blocks["actor_impulsar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Стрибок на X")
            .appendField(new Blockly.FieldNumber(-100, 4, 100, 0.1), "x")
            .appendField("і Y")
            .appendField(new Blockly.FieldNumber(-100, 8, 100, 0.1), "y");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_impulsar"] = function (block) {
    var intensidad = block.getFieldValue("intensidad");
    var x = +block.getFieldValue("x");
    var y = +block.getFieldValue("y");
    var code = "this.impulsar(" + x + ", " + y + ");\n";
    return code;
};
Blockly.Blocks["actor_inicia"] = {
    init: function () {
        this.appendDummyInput().appendField("Спочатку");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_inicia"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "actor._bloques_iniciar = function() {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["actor_reiniciar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Перезапустити");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_reiniciar"] = function (block) {
    var code = "this.reiniciar();\n";
    return code;
};
Blockly.Blocks["actor_reproducir_animacion"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Відтворити анімацію")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "animacion"); 
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    generateOptions: function () {
        let a = [
            ["лазер", "laser"],
            ["корабель", "nave"],
            ["вибух", "explosion"],
            ["міні_вибух", "mini_explosion"],
            ["удар", "golpe"],
            ["іскра", "chispa"],
            ["дим", "humo"],
            ["піксельна_людина_крокує", "hombre_pixel_camina"],
            ["піксельна_людина_стоїть", "hombre_pixel_parado"],
            ["привид1_рухається", "fantasma_azul_camina"],
            ["привид2_рухається", "fantasma_camina"],
            ["монета", "moneda"],
            ["пакмен_їсть", "pacman_come"],
            ["пакмен_стоїть", "pacman_espera"],
            ["корабель_повертає_праворуч", "nave_girando_a_la_derecha"],
            ["корабель_повертає_ліворуч", "nave_girando_a_la_izquierda"],
            ["корабель_летить", "nave_avanzando"],
            ["корабель_стоїть", "nave_en_reposo"],
            ["курка_літає", "gallina_vuela"],
            ["корабель_рухається", "nave_avanza"],
            ["зайчик_підстрибнув", "conejo_salta"],
            ["зайчик_чекає", "conejo_parado"],
            ["зайчик_біжить", "conejo_camina"],
            ["bmo_рухається", "bmo_camina"],
            ["bmo_піднімається", "bmo_escala"],
            ["bmo_стрибає", "bmo_salta"],
            ["bmo_стоїть", "bmo_parado"]
        ];
              
        window["valores_dropdown"].animaciones = a;
        return window["valores_dropdown"].animaciones;
    }
};
Blockly.JavaScript["actor_reproducir_animacion"] = function (block) {
    var animacion = block.getFieldValue("animacion");
    return "this.animacion = \"" + animacion + "\";\n";
};
Blockly.Blocks["actor_saltar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Пропустити");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_saltar"] = function (block) {
    var code = "this.saltar();\n";
    return code;
};
Blockly.Blocks["audio_detener_musica"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Зупинити відтворення");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    generateOptions: function () {
        let s = [
            ["лазер", "laser"],
            ["вибух", "explosion"],
            ["курка", "gallina"],
            ["збір монет", "moneda"],
            ["короткий стрибок", "salto-corto"],
            ["довгий стрибок", "salto-largo"],
            ["високий звук вибору", "seleccion-aguda"],
            ["низький звук вибору", "seleccion-grave"],
            ["їсти", "comer"]
        ];
        window["valores_dropdown"].sonidos = s;
        return window["valores_dropdown"].sonidos;
    }
};
Blockly.JavaScript["audio_detener_musica"] = function (block) {
    var code = "this.pilas.detener_musica();\n";
    return code;
};
Blockly.Blocks["audio_reproducir_musica"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Відтворювати безперервно")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "musica");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    generateOptions: function () {
        let s = [
            ["лазер", "laser"],
            ["вибух", "explosion"],
            ["курка", "gallina"],
            ["збір монет", "moneda"],
            ["короткий стрибок", "salto-corto"],
            ["довгий стрибок", "salto-largo"],
            ["високий звук вибору", "seleccion-aguda"],
            ["низький звук вибору", "seleccion-grave"],
            ["їсти", "comer"]
        ];
        window["valores_dropdown"].sonidos = s;
        return window["valores_dropdown"].sonidos;
    }
};
Blockly.JavaScript["audio_reproducir_musica"] = function (block) {
    var musica = block.getFieldValue("musica");
    var code = "this.pilas.reproducir_musica(\"" + musica + "\");\n";
    return code;
};
Blockly.Blocks["audio_reproducir_sonido"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Відтворити звук одноразово")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "sonido");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    generateOptions: function () {
        let s = [
            ["лазер", "laser"],
            ["вибух", "explosion"],
            ["курка", "gallina"],
            ["збір монет", "moneda"],
            ["короткий стрибок", "salto-corto"],
            ["довгий стрибок", "salto-largo"],
            ["високий звук вибору", "seleccion-aguda"],
            ["низький звук вибору", "seleccion-grave"],
            ["їсти", "comer"]
        ];
        window["valores_dropdown"].sonidos = s;
        return window["valores_dropdown"].sonidos;
    }
};
Blockly.JavaScript["audio_reproducir_sonido"] = function (block) {
    var sonido = block.getFieldValue("sonido");
    var code = "this.pilas.reproducir_sonido(\"" + sonido + "\");\n";
    return code;
};
Blockly.Blocks["camara_desplazar_horizontalmente"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Панорамування камери")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor")
            .appendField("пікселів по горизонталі");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_desplazar_horizontalmente"] = function (block) {
    var valor = block.getFieldValue('valor');
    return "this.pilas.camara.x += " + valor + ";\n";
};
Blockly.Blocks["camara_desplazar_verticalmente"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Панорамування камери")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor")
            .appendField("пікселів по вертикалі");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_desplazar_verticalmente"] = function (block) {
    var valor = block.getFieldValue('valor');
    return "this.pilas.camara.y += " + valor + ";\n";
};
Blockly.Blocks["camara_fijar_x"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Встановити горизонтальне положення камери")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_fijar_x"] = function (block) {
    var valor = block.getFieldValue('valor');
    var code = "\n    this.pilas.camara.x = " + valor + ";\n  ";
    return code;
};
Blockly.Blocks["camara_fijar_y"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Встановити вертикальне положення камери")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_fijar_y"] = function (block) {
    var valor = block.getFieldValue('valor');
    var code = "\n    this.pilas.camara.y = " + valor + ";\n  ";
    return code;
};
Blockly.Blocks["camara_mover_camara"] = {
    init: function () {
        this.appendDummyInput().appendField("Перемістіть камеру в X:");
        this.appendValueInput("x").setCheck("Number");
        this.appendDummyInput().appendField("e Y:");
        this.appendValueInput("y").setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["camara_mover_camara"] = function (block) {
    var value_x = Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ATOMIC);
    var code = "\n    this.pilas.camara.x = " + value_x + ";\n    this.pilas.camara.y = " + value_y + ";\n  ";
    return code;
};
Blockly.Blocks["camara_vibrar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Вібрація камери з інтенсивністю")
            .appendField(new Blockly.FieldNumber(2, 1, 50, 1), "intensidad")
            .appendField("пікселів протягом")
            .appendField(new Blockly.FieldNumber(0.5, 0.1, 10, 0.1), "segundos")
            .appendField("секунд");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["camara_vibrar"] = function (block) {
    var intensidad = block.getFieldValue("intensidad");
    var segundos = block.getFieldValue("segundos");
    return "pilas.camara.vibrar(" + intensidad + ", " + segundos + ");\n";
};
Blockly.Blocks["control_tecla"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Клавіша")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "NAME")
            .appendField("натиснута?");
        this.setOutput(true, "Boolean");
        this.setColour(210);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    generateOptions: function () {
        return window["valores_dropdown"].teclas;
    }
};
Blockly.JavaScript["control_tecla"] = function (block) {
    var dropdown_name = block.getFieldValue("NAME");
    var code = "this.pilas.control." + dropdown_name;
    return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.Blocks["escena_al_actualizar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("При оновленні");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_al_actualizar"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_al_actualizar = function() {\n    " + sentencias + "\n  };";
    return code;
};
Blockly.Blocks["escena_al_iniciar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Спочатку");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_al_iniciar"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_al_iniciar = function(x, y, evento) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["escena_cada_segundo"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Щосекунди");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_cada_segundo"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_cada_segundo = function(segundos_transcurridos) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["escena_cuando_hace_click"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Коли ви клікаєте");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_cuando_hace_click"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_cuando_hace_click = function(x, y, evento) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["pilas_cursor_x"] = {
    init: function () {
        this.appendDummyInput().appendField("Координата X вказівника миші");
        this.setOutput(true, null);
        this.setColour(135);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["pilas_cursor_x"] = function (block) {
    var code = "pilas.cursor_x";
    return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.Blocks["pilas_cursor_y"] = {
    init: function () {
        this.appendDummyInput().appendField("Координата Y вказівника миші");
        this.setOutput(true, null);
        this.setColour(135);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["pilas_cursor_y"] = function (block) {
    var code = "pilas.cursor_y";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

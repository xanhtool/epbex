/*! Receipt Designer for ePOS SDK Copyright Seiko Epson Corporation 2016 - 2017 All rights reserved. */
var tabindex = 0;
$(function () {

    var h = window.localStorage,
        e, a, d;
    var c, b, f, g;
    if (h) {
        e = h.getItem("model");
        if (e) {
            a = e - 0;
            d = $("#setting-model").get(0);
            if (!isNaN(a) && a >= 0 && a < d.length) {
                d.selectedIndex = a
            }
        }
        e = h.getItem("width");
        if (e) {
            $("#setting-width").val(e)
        }
        e = h.getItem("ipaddr");
        if (e) {
            $("#setting-ipaddr").val(e);
            c = e
        }
        e = h.getItem("port");
        if (e) {
            $("#setting-port").val(e);
            b = e
        }
        e = h.getItem("devid");
        if (e) {
            $("#setting-devid").val(e);
            f = e
        }
        e = h.getItem("timeout");
        if (e) {
            a = e - 0;
            if (!isNaN(a) && a >= 0 && a <= 300000) {
                $("#setting-timeout").val(a);
                g = a
            }
        }
        e = h.getItem("status");
        if (e) {
            if (/^(1|true)$/.test(e)) {
                $("#setting-status").attr("checked", "checked")
            } else {
                if (/^(0|false)$/.test(e)) {
                    $("#setting-status").removeAttr("checked")
                }
            }
        }
        e = h.getItem("jobid");
        if (e) {
            if (/^(1|true)$/.test(e)) {
                $("#setting-jobid").attr("checked", "checked")
            } else {
                if (/^(0|false)$/.test(e)) {
                    $("#setting-jobid").removeAttr("checked")
                }
            }
        }
        e = h.getItem("drawer");
        if (e) {
            a = e - 0;
            if (!isNaN(a) && a >= 0 && a <= 1) {
                $("#setting-drawer").get(0).selectedIndex = a
            }
        }
    }

    $("#run").click(function () {
        updateAll();
    })

    $("#tabs").tabs({
        select: function (i, j) {
            switch (tabindex) {
                case 0:
                    try {
                        exportDoc()
                    } catch (k) {
                        $("#edit-info").text(k.message);
                        $("#edit-error").dialog("open");
                        return false
                    }
                    break;
                case 5:
                    try {
                        exportDoc()
                    } catch (k) { }
                    if ($("#setting-ipaddr").val() != c || $("#setting-port").val() != b || $("#setting-devid").val() != f || $("#setting-timeout").val() != g) {
                        connectPrinter()
                    } else {
                        setStatusMonitor()
                    }
                    c = $("#setting-ipaddr").val();
                    b = $("#setting-port").val();
                    f = $("#setting-devid").val();
                    g = $("#setting-timeout").val();
                    break;
                default:
                    break
            }
            switch (j.index) {
                // case 1:
                //     try {
                //         drawPreview()
                //     } catch (k) {
                //         $("#edit-info").text(k.message);
                //         $("#edit-error").dialog("open");
                //         return false
                //     }
                //     break;
                // case 2:
                //     setApiCode();
                //     break;
                // case 3:
                //     setXmlDoc();
                //     break;
                // case 4:
                //     setPrintDoc(getXmlDoc());
                //     break;
                case 1:
                    setApiCode();
                    break;
                case 2:
                    setPrintDoc(getXmlDoc());
                    break;
                default:
                    break
            }
            tabindex = j.index
        },
        selected: tabindex
    });

    $("#print-now").button().click(function () {
        // setPrintDoc(getXmlDoc());
        // sendPrintDoc();
        getAndPrint();
    });

    $("#edit-left").disableSelection().draggable({
        axis: "y",
        containment: "parent"
    });
    $("#edit-left li").hover(function () {
        $(this).addClass("ui-state-highlight")
    }, function () {
        $(this).removeClass("ui-state-highlight")
    }).click(function () {
        console.log('click element');
        var i = $(this).clone();
        $("#edit-sequence").append(i);
        extract(i);
        updateAll();
    }).draggable({
        connectToSortable: "#edit-sequence",
        helper: "clone"
    });
    $("#edit-sequence").sortable({
        placeholder: "edit-holder",
        update: function (i, j) {
            extract(j.item)
        }
    });
    $("#edit-clear").button().click(function () {
        $("#edit-confirm").dialog("open")
    });
    $("#edit-confirm").dialog({
        autoOpen: false,
        width: 400,
        buttons: [{
            text: message.yes,
            click: function () {
                $(this).dialog("close");
                $("#edit-sequence li").remove();
                $("#edit-force").removeAttr("checked");
                $("#edit-left").css({
                    top: 0
                });
                updateAll();
            }
        }, {
            text: message.no,
            click: function () {
                $(this).dialog("close")
            }
        }],
        show: "fade",
        hide: "fade",
        draggable: true,
        resizable: false,
        modal: true
    });
    $("#edit-import").button().click(function () {
        $("#import-doc, #import-info").val("");
        $("#import").dialog("open")
    });
    $("#import").dialog({
        autoOpen: false,
        width: 600,
        buttons: [{
            text: message.close,
            click: function () {
                $(this).dialog("close")
            }
        }],
        show: "fade",
        hide: "fade",
        draggable: true,
        resizable: false,
        modal: true
    });
    $("#import-apply").button().click(function () {
        $("#import-confirm").dialog("open")
    });
    $("#import-confirm").dialog({
        autoOpen: false,
        width: 400,
        buttons: [{
            text: message.yes,
            click: function () {
                $(this).dialog("close");
                importDoc();
                updateAll();
                $("#edit-left").css({
                    top: 0
                })
            }
        }, {
            text: message.no,
            click: function () {
                $(this).dialog("close")
            }
        }],
        show: "fade",
        hide: "fade",
        draggable: true,
        resizable: false,
        modal: true
    });
    $("#edit-error").dialog({
        autoOpen: false,
        width: 600,
        buttons: [{
            text: message.ok,
            click: function () {
                $(this).dialog("close")
            }
        }],
        show: "fade",
        hide: "fade",
        draggable: true,
        resizable: false,
        modal: true
    });
    $("#api-code, #xml-doc").click(function () {
        $(this).select()
    }).keydown(function (i) {
        i.preventDefault()
    }).bind("paste", function (i) {
        i.preventDefault()
    });
    $("#print-info, #import-info").change(function () {
        this.scrollTop = this.scrollHeight
    }).keydown(function (i) {
        i.preventDefault()
    }).bind("paste", function (i) {
        i.preventDefault()
    });
    $("#print-send").button().click(function () {
        sendPrintDoc()
    });

    $("#print-clear").button().click(function () {
        $("#print-info").val("")
    });
    $("#setting-model").change(function () {
        if (/^tm_(l90|p60_la)/.test($(this).val())) {
            $(this).next().fadeIn();
            $("#setting-width").change()
        } else {
            $(this).next().fadeOut()
        }
    }).change();
    $("#setting-width").change(function () {
        var k = $(this).val() - 0,
            i, j;
        if (/^tm_l90/.test($("#setting-model").val())) {
            if (isNaN(k) || k > 80) {
                k = 80
            } else {
                if (k < 38) {
                    k = 38
                }
            }
            $(this).val(k);
            j = Math.min(576, 256 + ((k - 38) << 3));
            i = modelinfo.tm_l90_re;
            i.width = j;
            i.page.ini_w = j;
            i.page.max_w = j;
            j = Math.min(560, 224 + ((k - 38) << 3));
            i = modelinfo.tm_l90_la;
            i.width = j;
            i.page.ini_w = j;
            i.page.max_w = j
        } else {
            if (isNaN(k) || k > 60) {
                k = 60
            } else {
                if (k < 29) {
                    k = 29
                }
            }
            $(this).val(k);
            j = Math.min(400, 152 + ((k - 29) << 3));
            i = modelinfo.tm_p60_la;
            i.width = j;
            i.page.ini_w = j;
            i.page.max_w = j
        }
    }).change();
    $("#setting-timeout").change(function () {
        var i = $(this).val() - 0;
        if (isNaN(i) || i > 300000) {
            i = 60000
        } else {
            if (i < 1000) {
                i = 1000
            }
        }
        $(this).val(i)
    });
    $(window).bind("unload", function (i) {
        var j = window.localStorage;
        if (j) {
            j.setItem("model", $("#setting-model").get(0).selectedIndex);
            j.setItem("width", $("#setting-width").val());
            j.setItem("ipaddr", $("#setting-ipaddr").val());
            j.setItem("port", $("#setting-port").val());
            j.setItem("devid", $("#setting-devid").val());
            j.setItem("timeout", $("#setting-timeout").val());
            j.setItem("status", $("#setting-status").is(":checked"));
            j.setItem("jobid", $("#setting-jobid").is(":checked"));
            j.setItem("drawer", $("#setting-drawer").get(0).selectedIndex)
        }
    });
    connectPrinter()
});

function updateAll() {
    drawPreview();
    exportDoc();
    setXmlDoc();
}

function getAndPrint() {
    setPrintDoc(getXmlDoc());
    sendPrintDoc()
}

function extract(a) {
    a.find("button").button({
        icons: {
            primary: "ui-icon-close"
        },
        text: false
    }).click(function () {
        a.fadeOut("fast", function () {
            $(this).remove();
            console.log('remove element');
            updateAll();
        })
    });
    a.find(".attr-text-linespc, .attr-feed-unit, .attr-feed-line, .attr-sound-repeat").each(function () {
        slider($(this), 0, 255, 1)
    });
    a.find(".attr-barcode-height").each(function () {
        slider($(this), 1, 255, 1)
    });
    a.find(".attr-logo-key1, .attr-logo-key2").each(function () {
        slider($(this), 32, 126, 1)
    });
    a.find(".attr-hline-x1, .attr-hline-x2, .attr-vline-x, .attr-area-x").each(function () {
        slider($(this), 0, 575, 1)
    });
    a.find(".attr-area-width").each(function () {
        slider($(this), 1, 576, 1)
    });
    a.find(".attr-text-x, .attr-text-y, .attr-area-y, .attr-position-x, .attr-position-y, .attr-line-x1, .attr-line-y1, .attr-line-x2, .attr-line-y2, .attr-rectangle-x1, .attr-rectangle-y1, .attr-rectangle-x2, .attr-rectangle-y2").each(function () {
        slider($(this), 0, 2399, 1)
    });
    a.find(".attr-area-height").each(function () {
        slider($(this), 1, 2400, 1)
    });
    a.find(".attr-text-width, .attr-text-height").each(function () {
        slider($(this), 1, 8, 1)
    });
    a.find(".attr-image-brightness").each(function () {
        slider($(this), 0.1, 10, 0.1)
    });
    a.find(".attr-barcode-width").each(function () {
        slider($(this), 2, 6, 1)
    });
    a.find(".attr-symbol-width").each(function () {
        slider($(this), 0, 16, 1)
    });
    a.find(".attr-symbol-height").each(function () {
        slider($(this), 0, 8, 1)
    });
    a.find(".attr-symbol-size").each(function () {
        slider($(this), 0, 2400, 1)
    });
    a.find(".attr-symbol-level").each(function () {
        slider($(this), 5, 95, 1)
    });
    a.find(".attr-sound-cycle").each(function () {
        slider($(this), 1000, 25500, 100)
    });
    a.find(".attr-layout-width").each(function () {
        slider($(this), 29, 80, 0.1)
    });
    a.find(".attr-layout-height").each(function () {
        slider($(this), 28.4, 310, 0.1)
    });
    a.find(".attr-layout-margin-top").each(function () {
        slider($(this), -15, 300, 0.1)
    });
    a.find(".attr-layout-margin-bottom").each(function () {
        slider($(this), -1.5, 1.5, 0.1)
    });
    a.find(".attr-layout-offset-cut").each(function () {
        slider($(this), -29, 5, 0.1)
    });
    a.find(".attr-layout-offset-label").each(function () {
        slider($(this), 0, 1.5, 0.1)
    });
    a.find(".tooltip-text").hover(function () {
        a.find(".tooltip:not(:animated)").fadeIn()
    }, function () {
        a.find(".tooltip").fadeOut()
    });
    a.find(".attr-image-load").click(function () {
        var b = $(this).nextAll(".attr-image").get(0);
        b.src = $(this).prevAll(".attr-image-file").val() + "?" + new Date().getTime()
    });
    a.find(":text").click(function () {
        $(this).focus()
    }).keypress(function (b) {
        if (b.which == 13) {
            b.preventDefault()
        }
    });
    a.find(".attr-text-data").css("font", "medium " + font);
    a.find(".attr-layout-height-auto").attr("name", new Date().getTime());
    a.removeClass("ui-state-highlight");
    a.find(".edit-caption").css("float", "left");
    a.find("div").show()
}

function slider(d, b, a, c) {
    d.change(function () {
        var e = d.val() - 0;
        if (isNaN(e) || e < b) {
            e = b
        } else {
            if (e > a) {
                e = a
            }
        }
        d.val(e);
        $(this).next().slider("value", e)
    }).next().slider({
        min: b,
        max: a,
        value: d.val() - 0,
        step: c,
        slide: function (e, f) {
            d.val(f.value)
        }
    })
};



// hotkey listen to update change

var keys = {};

$(document).keydown(function (e) {
    keys[e.which] = true;

    if (keys[17] && keys[83]) { // Ctrl + Alt + 1 in that order
        console.log("save");
        event.preventDefault();
        updateAll();
        return false;
    } else if (keys[17] && keys[80]) {
        console.log("print");
        event.preventDefault();
        getAndPrint();
    } else {
        return true;
    }
});

$(document).keyup(function (e) {
    delete keys[e.which];
});
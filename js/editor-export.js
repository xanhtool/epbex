var xml = "";
var api = "";

function setApiCode() {
    var a = new Array();
    a.push("var canvas = document.getElementById('canvas');");
    a.push("var printer = null;");
    a.push("var ePosDev = new epson.ePOSDevice();");
    a.push("ePosDev.connect('" + $("#setting-ipaddr").val() + "', " + $("#setting-port").val() + ", cbConnect);");
    a.push("function cbConnect(data) {");
    a.push("    if(data == 'OK' || data == 'SSL_CONNECT_OK') {");
    a.push("        ePosDev.createDevice('" + $("#setting-devid").val() + "', ePosDev.DEVICE_TYPE_PRINTER,");
    a.push("                              {'crypto':false, 'buffer':false}, cbCreateDevice_printer);");
    a.push("    } else {");
    a.push("        alert(data);");
    a.push("    }");
    a.push("}");
    a.push("function cbCreateDevice_printer(devobj, retcode) {");
    a.push("    if( retcode == 'OK' ) {");
    a.push("        printer = devobj;");
    a.push("        printer.timeout = " + $("#setting-timeout").val() + ";");
    a.push("        printer.onreceive = function (res) { alert(res.success); };");
    a.push("        printer.oncoveropen = function () { alert('coveropen'); };");
    a.push("        print();");
    a.push("    } else {");
    a.push("        alert(retcode);");
    a.push("    }");
    a.push("}");
    a.push("");
    a.push("function print() {");
    a.push(api);
    a.push("    printer.send();");
    a.push("}");
    $("#api-code").val(a.join("\n"))
}

function setXmlDoc() {
    $("#xml-doc").val(xml)
}

function getXmlDoc() {
    return xml
}

function exportDoc() {
    var g = new epson.ePOSBuilder(),
        c = new Array(),
        k, l, f = modelinfo[$("#setting-model").val()],
        b = false,
        i = true,
        a = f.page.ini_w,
        j = f.page.ini_h;
    rotate = false;
    if ($("#edit-force").is(":checked")) {
        g.force = true;
        c.push("    printer.force = true;")
    }
    try {
        $("#edit-sequence li").each(function (n) {
            var e, d, m, u, o, x, v, t, s, r, q, p;
            k = $(this);
            l = n + 1;
            if (k.hasClass("epos-text-align")) {
                x = k.find(".attr-text-align").val();
                g.addTextAlign(g[x]);
                c.push("    printer.addTextAlign(printer." + x + ");")
            } else {
                if (k.hasClass("epos-text-linespc")) {
                    x = k.find(".attr-text-linespc").val() | 0;
                    g.addTextLineSpace(x);
                    c.push("    printer.addTextLineSpace(" + x + ");")
                } else {
                    if (k.hasClass("epos-text-rotate")) {
                        x = k.find(".attr-text-rotate").is(":checked");
                        g.addTextRotate(x);
                        c.push("    printer.addTextRotate(" + x + ");")
                    } else {
                        if (k.hasClass("epos-text-lang")) {
                            x = k.find(".attr-text-lang").val();
                            g.addTextLang(x);
                            c.push("    printer.addTextLang('" + x + "');")
                        } else {
                            if (k.hasClass("epos-text-font")) {
                                x = k.find(".attr-text-font").val();
                                g.addTextFont(g[x]);
                                c.push("    printer.addTextFont(printer." + x + ");")
                            } else {
                                if (k.hasClass("epos-text-position")) {
                                    x = k.find(".attr-text-x").val() | 0;
                                    g.addTextPosition(x);
                                    c.push("    printer.addTextPosition(" + x + ");")
                                } else {
                                    if (k.hasClass("epos-text-vposition")) {
                                        x = k.find(".attr-text-y").val() | 0;
                                        g.addTextVPosition(x);
                                        c.push("    printer.addTextVPosition(" + x + ");")
                                    } else {
                                        if (k.hasClass("epos-text-smooth")) {
                                            x = k.find(".attr-text-smooth").is(":checked");
                                            g.addTextSmooth(x);
                                            c.push("    printer.addTextSmooth(" + x + ");")
                                        } else {
                                            if (k.hasClass("epos-text-size")) {
                                                x = k.find(".attr-text-width").val() | 0;
                                                v = k.find(".attr-text-height").val() | 0;
                                                g.addTextSize(x, v);
                                                c.push("    printer.addTextSize(" + x + ", " + v + ");")
                                            } else {
                                                if (k.hasClass("epos-text-double")) {
                                                    x = k.find(".attr-text-dw").is(":checked");
                                                    v = k.find(".attr-text-dh").is(":checked");
                                                    g.addTextDouble(x, v);
                                                    c.push("    printer.addTextDouble(" + x + ", " + v + ");")
                                                } else {
                                                    if (k.hasClass("epos-text-style")) {
                                                        x = k.find(".attr-text-reverse").is(":checked");
                                                        v = k.find(".attr-text-ul").is(":checked");
                                                        t = k.find(".attr-text-em").is(":checked");
                                                        s = k.find(".attr-text-color").val();
                                                        g.addTextStyle(x, v, t, g[s]);
                                                        c.push("    printer.addTextStyle(" + x + ", " + v + ", " + t + ", printer." + s + ");")
                                                    } else {
                                                        if (k.hasClass("epos-text")) {
                                                            x = k.find(".attr-text-data").val();
                                                            g.addText(escapeText(x));
                                                            c.push("    printer.addText('" + escapeTextApi(x) + "');")
                                                        } else {
                                                            if (k.hasClass("epos-feed-unit")) {
                                                                x = k.find(".attr-feed-unit").val() | 0;
                                                                g.addFeedUnit(x);
                                                                c.push("    printer.addFeedUnit(" + x + ");")
                                                            } else {
                                                                if (k.hasClass("epos-feed-line")) {
                                                                    x = k.find(".attr-feed-line").val() | 0;
                                                                    g.addFeedLine(x);
                                                                    c.push("    printer.addFeedLine(" + x + ");")
                                                                } else {
                                                                    if (k.hasClass("epos-feed")) {
                                                                        g.addFeed();
                                                                        c.push("    printer.addFeed();")
                                                                    } else {
                                                                        if (k.hasClass("epos-feed-pos")) {
                                                                            x = k.find(".attr-feed-pos").val();
                                                                            g.addFeedPosition(g[x]);
                                                                            c.push("    printer.addFeedPosition(printer." + x + ");")
                                                                        } else {
                                                                            if (k.hasClass("epos-image")) {
                                                                                x = k.find(".attr-image-color").val();
                                                                                v = k.find(".attr-image-mode").val();
                                                                                t = k.find(".attr-image-brightness").val();
                                                                                s = k.find(".attr-image-halftone").val();
                                                                                r = k.find(".attr-image-fit").is(":checked");
                                                                                m = k.find(".attr-image").get(0);
                                                                                e = $("#epos-image").get(0);
                                                                                if (r) {
                                                                                    u = b ? (i ? a : j) : f.width;
                                                                                    o = m.height * u / m.width | 0
                                                                                } else {
                                                                                    u = Math.min(m.width, b ? (i ? a : j) : f.width);
                                                                                    o = m.height
                                                                                }
                                                                                e.width = u;
                                                                                e.height = o;
                                                                                if (e.getContext) {
                                                                                    d = e.getContext("2d");
                                                                                    d.clearRect(0, 0, u, o);
                                                                                    if (r) {
                                                                                        d.drawImage(m, 0, 0, u, o)
                                                                                    } else {
                                                                                        d.drawImage(m, 0, 0, u, o, 0, 0, u, o)
                                                                                    }
                                                                                    g.brightness = t;
                                                                                    g.halftone = g[s];
                                                                                    g.addImage(d, 0, 0, u, o, g[x], g[v]);
                                                                                    c.push("    printer.brightness = " + t + ";");
                                                                                    c.push("    printer.halftone = printer." + s + ";");
                                                                                    c.push("    printer.addImage(context, 0, 0, " + u + ", " + o + ", printer." + x + ", printer." + v + ");")
                                                                                }
                                                                            } else {
                                                                                if (k.hasClass("epos-logo")) {
                                                                                    x = k.find(".attr-logo-key1").val() | 0;
                                                                                    v = k.find(".attr-logo-key2").val() | 0;
                                                                                    g.addLogo(x, v);
                                                                                    c.push("    printer.addLogo(" + x + ", " + v + ");")
                                                                                } else {
                                                                                    if (k.hasClass("epos-barcode")) {
                                                                                        x = k.find(".attr-barcode-data").val();
                                                                                        v = k.find(".attr-barcode-type").val();
                                                                                        t = k.find(".attr-barcode-hri").val();
                                                                                        s = k.find(".attr-barcode-font").val();
                                                                                        r = k.find(".attr-barcode-width").val() | 0;
                                                                                        q = k.find(".attr-barcode-height").val() | 0;
                                                                                        g.addBarcode(escapeTextHex(x), g[v], g[t], g[s], r, q);
                                                                                        c.push("    printer.addBarcode('" + escapeTextHexApi(x) + "', printer." + v + ", printer." + t + ", printer." + s + ", " + r + ", " + q + ");")
                                                                                    } else {
                                                                                        if (k.hasClass("epos-symbol")) {
                                                                                            x = k.find(".attr-symbol-data").val();
                                                                                            v = k.find(".attr-symbol-type").val();
                                                                                            t = k.find(".attr-symbol-level-enum").val();
                                                                                            s = k.find(".attr-symbol-width").val() | 0;
                                                                                            r = k.find(".attr-symbol-height").val() | 0;
                                                                                            q = k.find(".attr-symbol-size").val() | 0;
                                                                                            p = k.find(".attr-symbol-level").val() | 0;
                                                                                            if (/^SYMBOL_AZTECCODE/.test(v)) {
                                                                                                g.addSymbol(escapeTextHex(x), g[v], p, s, r, q);
                                                                                                c.push("    printer.addSymbol('" + escapeTextHexApi(x) + "', printer." + v + ", " + p + ", " + s + ", " + r + ", " + q + ");")
                                                                                            } else {
                                                                                                g.addSymbol(escapeTextHex(x), g[v], g[t], s, r, q);
                                                                                                c.push("    printer.addSymbol('" + escapeTextHexApi(x) + "', printer." + v + ", printer." + t + ", " + s + ", " + r + ", " + q + ");")
                                                                                            }
                                                                                        } else {
                                                                                            if (k.hasClass("epos-hline")) {
                                                                                                x = k.find(".attr-hline-x1").val() | 0;
                                                                                                v = k.find(".attr-hline-x2").val() | 0;
                                                                                                t = k.find(".attr-hline-style").val();
                                                                                                g.addHLine(x, v, g[t]);
                                                                                                c.push("    printer.addHLine(" + x + ", " + v + ", printer." + t + ");")
                                                                                            } else {
                                                                                                if (k.hasClass("epos-vline-begin")) {
                                                                                                    x = k.find(".attr-vline-x").val() | 0;
                                                                                                    v = k.find(".attr-vline-style").val();
                                                                                                    g.addVLineBegin(x, g[v]);
                                                                                                    c.push("    printer.addVLineBegin(" + x + ", printer." + v + ");")
                                                                                                } else {
                                                                                                    if (k.hasClass("epos-vline-end")) {
                                                                                                        x = k.find(".attr-vline-x").val() | 0;
                                                                                                        v = k.find(".attr-vline-style").val();
                                                                                                        g.addVLineEnd(x, g[v]);
                                                                                                        c.push("    printer.addVLineEnd(" + x + ", printer." + v + ");")
                                                                                                    } else {
                                                                                                        if (k.hasClass("epos-page-begin")) {
                                                                                                            g.addPageBegin();
                                                                                                            c.push("    printer.addPageBegin();");
                                                                                                            b = true;
                                                                                                            a = f.page.ini_w;
                                                                                                            j = f.page.ini_h;
                                                                                                            i = true
                                                                                                        } else {
                                                                                                            if (k.hasClass("epos-area")) {
                                                                                                                x = k.find(".attr-area-x").val() | 0;
                                                                                                                v = k.find(".attr-area-y").val() | 0;
                                                                                                                t = k.find(".attr-area-width").val() | 0;
                                                                                                                s = k.find(".attr-area-height").val() | 0;
                                                                                                                g.addPageArea(x, v, t, s);
                                                                                                                c.push("    printer.addPageArea(" + x + ", " + v + ", " + t + ", " + s + ");");
                                                                                                                a = t;
                                                                                                                j = s
                                                                                                            } else {
                                                                                                                if (k.hasClass("epos-direction")) {
                                                                                                                    x = k.find(".attr-direction-dir").val();
                                                                                                                    g.addPageDirection(g[x]);
                                                                                                                    c.push("    printer.addPageDirection(printer." + x + ");");
                                                                                                                    i = dir_convert[g[x]].w
                                                                                                                } else {
                                                                                                                    if (k.hasClass("epos-position")) {
                                                                                                                        x = k.find(".attr-position-x").val() | 0;
                                                                                                                        v = k.find(".attr-position-y").val() | 0;
                                                                                                                        g.addPagePosition(x, v);
                                                                                                                        c.push("    printer.addPagePosition(" + x + ", " + v + ");")
                                                                                                                    } else {
                                                                                                                        if (k.hasClass("epos-line")) {
                                                                                                                            x = k.find(".attr-line-x1").val() | 0;
                                                                                                                            v = k.find(".attr-line-y1").val() | 0;
                                                                                                                            t = k.find(".attr-line-x2").val() | 0;
                                                                                                                            s = k.find(".attr-line-y2").val() | 0;
                                                                                                                            r = k.find(".attr-line-style").val();
                                                                                                                            g.addPageLine(x, v, t, s, g[r]);
                                                                                                                            c.push("    printer.addPageLine(" + x + ", " + v + ", " + t + ", " + s + ", printer." + r + ");")
                                                                                                                        } else {
                                                                                                                            if (k.hasClass("epos-rectangle")) {
                                                                                                                                x = k.find(".attr-rectangle-x1").val() | 0;
                                                                                                                                v = k.find(".attr-rectangle-y1").val() | 0;
                                                                                                                                t = k.find(".attr-rectangle-x2").val() | 0;
                                                                                                                                s = k.find(".attr-rectangle-y2").val() | 0;
                                                                                                                                r = k.find(".attr-rectangle-style").val();
                                                                                                                                g.addPageRectangle(x, v, t, s, g[r]);
                                                                                                                                c.push("    printer.addPageRectangle(" + x + ", " + v + ", " + t + ", " + s + ", printer." + r + ");")
                                                                                                                            } else {
                                                                                                                                if (k.hasClass("epos-page-end")) {
                                                                                                                                    g.addPageEnd();
                                                                                                                                    c.push("    printer.addPageEnd();");
                                                                                                                                    b = false
                                                                                                                                } else {
                                                                                                                                    if (k.hasClass("epos-cut")) {
                                                                                                                                        x = k.find(".attr-cut-type").val();
                                                                                                                                        g.addCut(g[x]);
                                                                                                                                        c.push("    printer.addCut(printer." + x + ");")
                                                                                                                                    } else {
                                                                                                                                        if (k.hasClass("epos-pulse")) {
                                                                                                                                            x = k.find(".attr-pulse-drawer").val();
                                                                                                                                            v = k.find(".attr-pulse-time").val();
                                                                                                                                            g.addPulse(g[x], g[v]);
                                                                                                                                            c.push("    printer.addPulse(printer." + x + ", printer." + v + ");")
                                                                                                                                        } else {
                                                                                                                                            if (k.hasClass("epos-sound")) {
                                                                                                                                                x = k.find(".attr-sound-pattern").val();
                                                                                                                                                v = k.find(".attr-sound-repeat").val() | 0;
                                                                                                                                                t = k.find(".attr-sound-cycle").val() | 0;
                                                                                                                                                if (/^PATTERN_(10|[1-9])$/.test(x)) {
                                                                                                                                                    g.addSound(g[x], v, t);
                                                                                                                                                    c.push("    printer.addSound(printer." + x + ", " + v + ", " + t + ");")
                                                                                                                                                } else {
                                                                                                                                                    g.addSound(g[x], v);
                                                                                                                                                    c.push("    printer.addSound(printer." + x + ", " + v + ");")
                                                                                                                                                }
                                                                                                                                            } else {
                                                                                                                                                if (k.hasClass("epos-layout")) {
                                                                                                                                                    x = k.find(".attr-layout-type").val();
                                                                                                                                                    v = k.find(".attr-layout-width").val() * 10 | 0;
                                                                                                                                                    t = k.find(".attr-layout-height-auto:first").is(":checked") ? 0 : k.find(".attr-layout-height").val() * 10 | 0;
                                                                                                                                                    s = k.find(".attr-layout-margin-top").val() * 10 | 0;
                                                                                                                                                    r = k.find(".attr-layout-margin-bottom").val() * 10 | 0;
                                                                                                                                                    q = k.find(".attr-layout-offset-cut").val() * 10 | 0;
                                                                                                                                                    p = k.find(".attr-layout-offset-label").val() * 10 | 0;
                                                                                                                                                    g.addLayout(g[x], v, t, s, r, q, p);
                                                                                                                                                    c.push("    printer.addLayout(printer." + x + ", " + v + ", " + t + ", " + s + ", " + r + ", " + q + ", " + p + ");")
                                                                                                                                                } else {
                                                                                                                                                    if (k.hasClass("epos-recovery")) {
                                                                                                                                                        g.addRecovery();
                                                                                                                                                        c.push("    printer.addRecovery();")
                                                                                                                                                    } else {
                                                                                                                                                        if (k.hasClass("epos-reset")) {
                                                                                                                                                            g.addReset();
                                                                                                                                                            c.push("    printer.addReset();")
                                                                                                                                                        } else {
                                                                                                                                                            if (k.hasClass("epos-command")) {
                                                                                                                                                                x = k.find(".attr-command-data").val();
                                                                                                                                                                g.addCommand(escapeTextHex(x));
                                                                                                                                                                c.push("    printer.addCommand('" + escapeTextHexApi(x) + "');")
                                                                                                                                                            } else {
                                                                                                                                                                if (k.hasClass("epos-rotate-begin")) {
                                                                                                                                                                    g.addRotateBegin();
                                                                                                                                                                    c.push("    printer.addRotateBegin();");
                                                                                                                                                                    rotate = true
                                                                                                                                                                } else {
                                                                                                                                                                    if (k.hasClass("epos-rotate-end")) {
                                                                                                                                                                        g.addRotateEnd();
                                                                                                                                                                        c.push("    printer.addRotateEnd();");
                                                                                                                                                                        rotate = false
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        xml = g.toString().replace(/><(?!\/(text|barcode|symbol|command)>)/g, ">\n<");
        api = c.join("\n")
    } catch (h) {
        throw new Error("[" + message.line + " " + l + "] " + h)
    }
}

function escapeTextHex(a) {
    var b = /\\x[0-9A-Fa-f]{2}/g;
    if (b.test(a)) {
        a = a.replace(b, function (d) {
            return String.fromCharCode(parseInt(d.slice(2), 16))
        })
    }
    return escapeText(a)
}

function escapeText(a) {
    var b = /\\[tnr\\]|\\/g;
    if (b.test(a)) {
        a = a.replace(b, function (e) {
            var d = "";
            switch (e) {
                case "\\t":
                    d = "\x09";
                    break;
                case "\\n":
                    d = "\x0a";
                    break;
                case "\\r":
                    d = "\x0d";
                    break;
                case "\\\\":
                    d = "\\";
                    break;
                default:
                    break
            }
            return d
        })
    }
    return a
}

function escapeTextHexApi(a) {
    var b = /\\x[0-9A-Fa-f]{2}|\\[tnr\\]|['"]|\\/g;
    if (b.test(a)) {
        a = a.replace(b, function (e) {
            var d = e;
            switch (e) {
                case '"':
                    d = '\\"';
                    break;
                case "'":
                    d = "\\'";
                    break;
                case "\\":
                    d = "";
                    break;
                default:
                    break
            }
            return d
        })
    }
    return a
}

function escapeTextApi(a) {
    var b = /\\[tnr\\]|['"]|\\/g;
    if (b.test(a)) {
        a = a.replace(b, function (e) {
            var d = e;
            switch (e) {
                case '"':
                    d = '\\"';
                    break;
                case "'":
                    d = "\\'";
                    break;
                case "\\":
                    d = "";
                    break;
                default:
                    break
            }
            return d
        })
    }
    return a
};
var color_convert = {
    none: "#ffffff",
    color_1: "#000000",
    color_2: "#c00000",
    color_3: "#00c000",
    color_4: "#0000c0"
};
var line_convert = {
    thin: {
        w: 1,
        d: false
    },
    medium: {
        w: 2,
        d: false
    },
    thick: {
        w: 4,
        d: false
    },
    thin_double: {
        w: 1,
        d: true
    },
    medium_double: {
        w: 2,
        d: true
    },
    thick_double: {
        w: 4,
        d: true
    }
};
var dir_convert = {
    left_to_right: {
        x: 0,
        y: 0,
        r: 0,
        w: true
    },
    top_to_bottom: {
        x: 1,
        y: 0,
        r: Math.PI * 0.5000001,
        w: false
    },
    right_to_left: {
        x: 1,
        y: 1,
        r: Math.PI,
        w: true
    },
    bottom_to_top: {
        x: 0,
        y: 1,
        r: Math.PI * 1.5000001,
        w: false
    }
};
var model = modelinfo.tm_t88_80;
var align = "left";
var linespc = 30;
var rotate = false;
var line_x = 0;
var line_y = 191;
var line_w = 0;
var line_h = 0;
var text_l = "en";
var text_f = "font_a";
var text_s = false;
var text_w = 1;
var text_h = 1;
var text_r = false;
var text_u = false;
var text_e = false;
var text_c = color_convert.color_1;
var font_a = 24;
var font_k = 24;
var hline = [];
var vline = [];
var page = false;
var page_linespc = 30;
var page_h = 0;
var area_x = 0;
var area_y = 0;
var area_w = 512;
var area_h = 831;
var area_valid = false;
var page_dir = dir_convert.left_to_right;
var page_x = 0;
var page_y = 23;
var matome = false;
var current_canvas_line = 0;
var no_rotate_part = new Array();

function drawPreview() {
    var a = new epson.ePOSBuilder(),
        b, g;
    model = modelinfo[$("#setting-model").val()];
    align = "left";
    linespc = model.linespc;
    rotate = false;
    line_x = 0;
    line_y = 191;
    line_w = 0;
    line_h = 0;
    text_l = "en";
    text_f = "font_a";
    text_s = false;
    text_w = 1;
    text_h = 1;
    text_r = false;
    text_u = false;
    text_e = false;
    text_c = color_convert.color_1;
    font_a = 24;
    font_k = 24;
    hline = [];
    vline = [];
    page = false;
    page_linespc = model.linespc;
    matome = false;
    current_canvas_line = 0;
    var f = -1;
    no_rotate_part = new Array();
    b = $("#preview-text").get(0);
    if (b.getContext) {
        g = b.getContext("2d");
        g.clearRect(0, 0, b.width, b.height)
    }
    $("#preview-rotate").height(0);
    $("#preview-paper canvas").remove();
    $("#preview-paper").width(model.width);
    $("#preview-width span").text(model.width);
    $("#preview-width img:eq(1)").attr("width", model.width - 2);
    $("#edit-sequence li").each(function () {
        var p = $(this),
            i, h, j, o, n, m, l, k;
        if (p.hasClass("epos-text-align")) {
            o = a[p.find(".attr-text-align").val()];
            if (page) {
                align = o
            } else {
                if (line_w == 0 && line_x == 0) {
                    align = o
                }
            }
        } else {
            if (p.hasClass("epos-text-linespc")) {
                o = p.find(".attr-text-linespc").val() - 0;
                if (page) {
                    page_linespc = o
                } else {
                    linespc = o
                }
            } else {
                if (p.hasClass("epos-text-rotate")) {
                    o = p.find(".attr-text-rotate").is(":checked");
                    if (page) {
                        rotate = o
                    } else {
                        if (line_w == 0 && line_x == 0) {
                            rotate = o
                        }
                    }
                } else {
                    if (p.hasClass("epos-text-lang")) {
                        text_l = p.find(".attr-text-lang").val()
                    } else {
                        if (p.hasClass("epos-text-font")) {
                            text_f = a[p.find(".attr-text-font").val()]
                        } else {
                            if (p.hasClass("epos-text-position")) {
                                o = p.find(".attr-text-x").val() - 0;
                                if (page) {
                                    if (o < (page_dir.w ? area_w : area_h)) {
                                        page_x = o
                                    }
                                } else {
                                    if (o < model.width) {
                                        line_x = o
                                    }
                                }
                            } else {
                                if (p.hasClass("epos-text-vposition")) {
                                    o = p.find(".attr-text-y").val() - 0;
                                    if (page) {
                                        if (o < (page_dir.w ? area_h : area_w)) {
                                            page_y = o
                                        }
                                    } else {}
                                } else {
                                    if (p.hasClass("epos-text-smooth")) {
                                        text_s = p.find(".attr-text-smooth").is(":checked")
                                    } else {
                                        if (p.hasClass("epos-text-size")) {
                                            text_w = p.find(".attr-text-width").val() - 0;
                                            text_h = p.find(".attr-text-height").val() - 0
                                        } else {
                                            if (p.hasClass("epos-text-double")) {
                                                text_w = p.find(".attr-text-dw").is(":checked") ? 2 : 1;
                                                text_h = p.find(".attr-text-dh").is(":checked") ? 2 : 1
                                            } else {
                                                if (p.hasClass("epos-text-style")) {
                                                    text_r = p.find(".attr-text-reverse").is(":checked");
                                                    text_u = p.find(".attr-text-ul").is(":checked");
                                                    text_e = p.find(".attr-text-em").is(":checked");
                                                    text_c = color_convert[a[p.find(".attr-text-color").val()]]
                                                } else {
                                                    if (p.hasClass("epos-text")) {
                                                        o = escapeText(p.find(".attr-text-data").val());
                                                        if (page) {
                                                            drawPageText(o)
                                                        } else {
                                                            drawText(o)
                                                        }
                                                    } else {
                                                        if (p.hasClass("epos-feed-unit")) {
                                                            o = p.find(".attr-feed-unit").val() - 0;
                                                            if (page) {
                                                                drawPageFeed(o)
                                                            } else {
                                                                drawFeed(o)
                                                            }
                                                        } else {
                                                            if (p.hasClass("epos-feed-line")) {
                                                                o = p.find(".attr-feed-line").val() - 0;
                                                                if (page) {
                                                                    drawPageFeed(o * page_linespc)
                                                                } else {
                                                                    drawFeed(o * linespc)
                                                                }
                                                            } else {
                                                                if (p.hasClass("epos-feed")) {
                                                                    if (page) {
                                                                        drawPageFeed(page_linespc)
                                                                    } else {
                                                                        drawFeed(linespc)
                                                                    }
                                                                } else {
                                                                    if (p.hasClass("epos-feed-pos")) {
                                                                        o = a[p.find(".attr-feed-pos").val()];
                                                                        if (page) {} else {
                                                                            if (line_w > 0) {
                                                                                drawFeed(linespc)
                                                                            }
                                                                            drawFixedIcon(p.find("img").get(0), o)
                                                                        }
                                                                    } else {
                                                                        if (p.hasClass("epos-image")) {
                                                                            o = a[p.find(".attr-image-color").val()];
                                                                            n = a[p.find(".attr-image-mode").val()];
                                                                            m = p.find(".attr-image-brightness").val() - 0;
                                                                            l = a[p.find(".attr-image-halftone").val()];
                                                                            k = p.find(".attr-image-fit").is(":checked");
                                                                            j = p.find(".attr-image").get(0);
                                                                            if (page) {
                                                                                drawPageImage(j, o, n, m, l, k)
                                                                            } else {
                                                                                if (line_w == 0) {
                                                                                    drawImage(j, o, n, m, l, k)
                                                                                }
                                                                            }
                                                                        } else {
                                                                            if (p.hasClass("epos-logo")) {
                                                                                o = p.find(".attr-logo-key1").val() - 0;
                                                                                n = p.find(".attr-logo-key2").val() - 0;
                                                                                if (page) {
                                                                                    drawPageIcon(p.find("img").get(0), o + ", " + n, false)
                                                                                } else {
                                                                                    if (line_w == 0) {
                                                                                        drawIcon(p.find("img").get(0), o + ", " + n)
                                                                                    }
                                                                                }
                                                                            } else {
                                                                                if (p.hasClass("epos-barcode")) {
                                                                                    o = p.find(".attr-barcode-data").val();
                                                                                    n = a[p.find(".attr-barcode-type").val()];
                                                                                    if (page) {
                                                                                        drawPageIcon(p.find("img").get(0), n + ", " + o, false)
                                                                                    } else {
                                                                                        if (line_w == 0) {
                                                                                            drawIcon(p.find("img").get(0), n + ", " + o)
                                                                                        }
                                                                                    }
                                                                                } else {
                                                                                    if (p.hasClass("epos-symbol")) {
                                                                                        o = p.find(".attr-symbol-data").val();
                                                                                        n = a[p.find(".attr-symbol-type").val()];
                                                                                        if (page) {
                                                                                            drawPageIcon(p.find("img").get(0), n + ", " + o, true)
                                                                                        } else {
                                                                                            if (line_w == 0) {
                                                                                                drawIcon(p.find("img").get(0), n + ", " + o)
                                                                                            }
                                                                                        }
                                                                                    } else {
                                                                                        if (p.hasClass("epos-hline")) {
                                                                                            o = p.find(".attr-hline-x1").val() - 0;
                                                                                            n = p.find(".attr-hline-x2").val() - 0;
                                                                                            m = a[p.find(".attr-hline-style").val()];
                                                                                            if (page) {} else {
                                                                                                hline.push({
                                                                                                    x1: Math.min(o, n),
                                                                                                    x2: Math.max(o, n),
                                                                                                    style: m
                                                                                                })
                                                                                            }
                                                                                        } else {
                                                                                            if (p.hasClass("epos-vline-begin")) {
                                                                                                o = p.find(".attr-vline-x").val() - 0;
                                                                                                n = a[p.find(".attr-vline-style").val()];
                                                                                                if (page) {} else {
                                                                                                    vline[n + o] = {
                                                                                                        x: o,
                                                                                                        style: n
                                                                                                    }
                                                                                                }
                                                                                            } else {
                                                                                                if (p.hasClass("epos-vline-end")) {
                                                                                                    o = p.find(".attr-vline-x").val() - 0;
                                                                                                    n = a[p.find(".attr-vline-style").val()];
                                                                                                    if (page) {} else {
                                                                                                        delete vline[n + o]
                                                                                                    }
                                                                                                } else {
                                                                                                    if (p.hasClass("epos-page-begin")) {
                                                                                                        if (page) {} else {
                                                                                                            if (line_w == 0 && line_x == 0) {
                                                                                                                i = $("#preview-page").get(0);
                                                                                                                if (i.getContext) {
                                                                                                                    h = i.getContext("2d");
                                                                                                                    h.clearRect(0, 0, i.width, i.height)
                                                                                                                }
                                                                                                                i = $("#preview-area").get(0);
                                                                                                                if (i.getContext) {
                                                                                                                    h = i.getContext("2d");
                                                                                                                    h.clearRect(0, 0, i.width, i.height)
                                                                                                                }
                                                                                                                page = true;
                                                                                                                page_h = 0;
                                                                                                                area_x = 0;
                                                                                                                area_y = 0;
                                                                                                                area_w = model.page.ini_w;
                                                                                                                area_h = model.page.ini_h;
                                                                                                                area_valid = false;
                                                                                                                page_dir = dir_convert.left_to_right;
                                                                                                                page_x = 0;
                                                                                                                page_y = 23;
                                                                                                                vline = [];
                                                                                                                if (f >= 0) {
                                                                                                                    RotatePage(f);
                                                                                                                    f = -2
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (p.hasClass("epos-area")) {
                                                                                                            o = p.find(".attr-area-x").val() - 0;
                                                                                                            n = p.find(".attr-area-y").val() - 0;
                                                                                                            m = p.find(".attr-area-width").val() - 0;
                                                                                                            l = p.find(".attr-area-height").val() - 0;
                                                                                                            if (page) {
                                                                                                                moveAreaToPage();
                                                                                                                area_x = o;
                                                                                                                area_y = n;
                                                                                                                area_w = m;
                                                                                                                area_h = l;
                                                                                                                area_valid = true;
                                                                                                                page_x = 0;
                                                                                                                page_y = 23
                                                                                                            } else {}
                                                                                                        } else {
                                                                                                            if (p.hasClass("epos-direction")) {
                                                                                                                o = a[p.find(".attr-direction-dir").val()];
                                                                                                                if (page) {
                                                                                                                    page_dir = dir_convert[o];
                                                                                                                    page_x = 0;
                                                                                                                    page_y = 23
                                                                                                                } else {}
                                                                                                            } else {
                                                                                                                if (p.hasClass("epos-position")) {
                                                                                                                    o = p.find(".attr-position-x").val() - 0;
                                                                                                                    n = p.find(".attr-position-y").val() - 0;
                                                                                                                    if (page) {
                                                                                                                        if (o < (page_dir.w ? area_w : area_h)) {
                                                                                                                            page_x = o
                                                                                                                        }
                                                                                                                        if (n < (page_dir.w ? area_h : area_w)) {
                                                                                                                            page_y = n
                                                                                                                        }
                                                                                                                    } else {}
                                                                                                                } else {
                                                                                                                    if (p.hasClass("epos-line")) {
                                                                                                                        o = p.find(".attr-line-x1").val() - 0;
                                                                                                                        n = p.find(".attr-line-y1").val() - 0;
                                                                                                                        m = p.find(".attr-line-x2").val() - 0;
                                                                                                                        l = p.find(".attr-line-y2").val() - 0;
                                                                                                                        k = a[p.find(".attr-line-style").val()];
                                                                                                                        if (page) {
                                                                                                                            drawPageLine(Math.min(o, m), Math.min(n, l), Math.max(o, m), Math.max(n, l), line_convert[k])
                                                                                                                        } else {}
                                                                                                                    } else {
                                                                                                                        if (p.hasClass("epos-rectangle")) {
                                                                                                                            o = p.find(".attr-rectangle-x1").val() - 0;
                                                                                                                            n = p.find(".attr-rectangle-y1").val() - 0;
                                                                                                                            m = p.find(".attr-rectangle-x2").val() - 0;
                                                                                                                            l = p.find(".attr-rectangle-y2").val() - 0;
                                                                                                                            k = a[p.find(".attr-rectangle-style").val()];
                                                                                                                            if (page) {
                                                                                                                                drawPageRect(Math.min(o, m), Math.min(n, l), Math.max(o, m), Math.max(n, l), line_convert[k])
                                                                                                                            } else {}
                                                                                                                        } else {
                                                                                                                            if (p.hasClass("epos-page-end")) {
                                                                                                                                if (page) {
                                                                                                                                    moveAreaToPage();
                                                                                                                                    drawPage();
                                                                                                                                    page = false;
                                                                                                                                    if (f == -2) {
                                                                                                                                        f = current_canvas_line
                                                                                                                                    }
                                                                                                                                } else {}
                                                                                                                            } else {
                                                                                                                                if (p.hasClass("epos-cut")) {
                                                                                                                                    o = a[p.find(".attr-cut-type").val()];
                                                                                                                                    if (page) {} else {
                                                                                                                                        if (line_w == 0 && line_x == 0) {
                                                                                                                                            drawFixedIcon(p.find("img").get(0), o)
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                } else {
                                                                                                                                    if (p.hasClass("epos-pulse")) {
                                                                                                                                        o = a[p.find(".attr-pulse-drawer").val()];
                                                                                                                                        n = a[p.find(".attr-pulse-time").val()];
                                                                                                                                        if (page) {} else {
                                                                                                                                            if (line_w > 0) {
                                                                                                                                                drawFeed(linespc)
                                                                                                                                            }
                                                                                                                                            drawFixedIcon(p.find("img").get(0), o + ", " + n)
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        if (p.hasClass("epos-sound")) {
                                                                                                                                            o = a[p.find(".attr-sound-pattern").val()];
                                                                                                                                            n = p.find(".attr-sound-repeat").val() - 0;
                                                                                                                                            if (page) {} else {
                                                                                                                                                if (line_w > 0) {
                                                                                                                                                    drawFeed(linespc)
                                                                                                                                                }
                                                                                                                                                drawFixedIcon(p.find("img").get(0), o + ", " + n)
                                                                                                                                            }
                                                                                                                                        } else {
                                                                                                                                            if (p.hasClass("epos-layout")) {
                                                                                                                                                o = a[p.find(".attr-layout-type").val()];
                                                                                                                                                if (page) {} else {
                                                                                                                                                    if (line_w > 0) {
                                                                                                                                                        drawFeed(linespc)
                                                                                                                                                    }
                                                                                                                                                    drawFixedIcon(p.find("img").get(0), o)
                                                                                                                                                }
                                                                                                                                            } else {
                                                                                                                                                if (p.hasClass("epos-recovery")) {
                                                                                                                                                    if (page) {} else {
                                                                                                                                                        drawFixedIcon(p.find("img").get(0), "")
                                                                                                                                                    }
                                                                                                                                                } else {
                                                                                                                                                    if (p.hasClass("epos-reset")) {
                                                                                                                                                        if (page) {} else {
                                                                                                                                                            drawFixedIcon(p.find("img").get(0), "")
                                                                                                                                                        }
                                                                                                                                                    } else {
                                                                                                                                                        if (p.hasClass("epos-command")) {
                                                                                                                                                            o = p.find(".attr-command-data").val();
                                                                                                                                                            if (page) {
                                                                                                                                                                drawPageIcon(p.find("img").get(0), o)
                                                                                                                                                            } else {
                                                                                                                                                                if (line_w > 0) {
                                                                                                                                                                    drawFeed(linespc)
                                                                                                                                                                }
                                                                                                                                                                drawFixedIcon(p.find("img").get(0), o, false)
                                                                                                                                                            }
                                                                                                                                                        } else {
                                                                                                                                                            if (p.hasClass("epos-rotate-begin")) {
                                                                                                                                                                if (f == -1) {
                                                                                                                                                                    f = current_canvas_line
                                                                                                                                                                }
                                                                                                                                                            } else {
                                                                                                                                                                if (p.hasClass("epos-rotate-end")) {
                                                                                                                                                                    if (f >= 0) {
                                                                                                                                                                        RotatePage(f);
                                                                                                                                                                        f = -1
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
        }
    });
    if (hline.length > 0) {
        drawHLine()
    }
}

function drawText(j) {
    var a, g, h, f, b;
    if (hline.length > 0) {
        drawHLine()
    }
    a = $("#preview-text").get(0);
    if (a.getContext) {
        g = a.getContext("2d");
        g.textAlign = "left";
        g.textBaseline = "alphabetic";
        e = j.match(/[\ud800-\udbff][\udc00-\udfff]|[\u304B\u304D\u304F\u3051\u3053\u30AB\u30AD\u30AF\u30B1\u30B3\u30BB\u30C4\u30C8\u31F7]\u309A|[\u00E6\u0254\u028C\u0259\u025A]\u0300|[\u0254\u028C\u0259\u025A]\u0301|\u02E9\u02E5|\u02E5\u02E9|[^\ud800-\udfff]/g) || [];
        for (f = 0; f < e.length; f++) {
            h = e[f];
            switch (h) {
                case "\t":
                    if (line_x == model.width) {
                        drawFeed(linespc)
                    }
                    b = font_a * 4;
                    line_x = Math.floor(line_x / b) * b + b;
                    if (line_x > model.width) {
                        drawFeed(linespc)
                    }
                    break;
                case "\n":
                    drawFeed(linespc);
                    break;
                case "\r":
                    break;
                default:
                    drawChar(g, h);
                    break
            }
        }
    }
}

function drawChar(f, i) {
    var a, j, b, g;
    f.font = "24px " + font;
    if (f.measureText(i).width < 18) {
        g = model.ank[text_f];
        if (g == 0) {
            g = font_a
        } else {
            font_a = g
        }
        b = g / 2
    } else {
        g = model.kanji[text_f];
        if (g == 0) {
            g = font_k
        } else {
            font_k = g
        }
        b = g
    }
    f.font = (g - 2) + "px " + font;
    if (line_x + b * text_w > model.width) {
        drawFeed(linespc)
    }
    line_h = Math.max(line_h, g * text_h);
    a = line_x / text_w;
    j = line_y / text_h;
    f.fillStyle = text_c;
    f.strokeStyle = text_c;
    f.shadowColor = text_c;
    f.setTransform(text_w, 0, 0, text_h, 0, 0);
    if (rotate) {
        f.translate(576 / text_w, 192 / text_h);
        f.rotate(Math.PI)
    }
    if (text_r) {
        f.fillRect(a, j, b, -g);
        c = "#f0f0f0";
        f.fillStyle = c;
        f.strokeStyle = c;
        f.shadowColor = c
    }
    if (b == g && text_l == "en") {
        f.strokeRect(a + 2, j - 2, b - 4, 4 - g)
    } else {
        f.shadowBlur = text_s ? 2 : 0;
        f.fillText(i, a, j - 4);
        if (text_e) {
            f.fillText(i, a + 1, j - 4)
        }
        f.shadowBlur = 0
    }
    if (text_u) {
        f.fillRect(a, j - 1, b, 1)
    }
    f.setTransform(1, 0, 0, 1, 0, 0);
    line_x += b * text_w;
    line_w = Math.max(line_w, line_x)
}

function drawFeed(m) {
    var g, f, n, b, k = 0,
        j, h, a;
    if (hline.length > 0) {
        drawHLine()
    }
    g = $("#preview-line").clone().removeAttr("id").attr({
        width: model.width,
        height: Math.max(line_h, m)
    }).get(0);
    n = $("#preview-text").get(0);
    if (g.getContext && n.getContext) {
        f = g.getContext("2d");
        b = n.getContext("2d");
        if (line_w > 0) {
            if (rotate) {
                if (align != "right") {
                    k = (model.width - line_w) / (align == "left" ? 1 : 2)
                }
                f.drawImage(n, 576 - line_w, 0, line_w, line_h, k, 0, line_w, line_h)
            } else {
                if (align != "left") {
                    k = (model.width - line_w) / (align == "right" ? 1 : 2)
                }
                f.drawImage(n, 0, 192 - line_h, line_w, line_h, k, 0, line_w, line_h)
            }
        }
        f.fillStyle = "#000000";
        for (j in vline) {
            h = vline[j];
            a = line_convert[h.style];
            f.fillRect(h.x, 0, a.w, g.height);
            if (a.d) {
                f.fillRect(h.x + a.w + 1, 0, a.w, g.height)
            }
        }
        b.clearRect(0, 0, n.width, n.height)
    }
    $("#preview-paper").append(g);
    no_rotate_part[current_canvas_line] = 0;
    current_canvas_line = current_canvas_line + 1;
    line_x = 0;
    line_w = 0;
    line_h = 0
}

function drawHLine() {
    var b, h, g, k, f, a, j;
    if (line_w > 0) {
        hline = [];
        drawFeed(0)
    } else {
        g = $("#preview-text").get(0);
        if (g.getContext) {
            k = g.getContext("2d");
            k.fillStyle = "#000000";
            for (f = 0; f < hline.length; f++) {
                a = hline[f];
                j = line_convert[a.style];
                k.fillRect(a.x1, 0, a.x2 - a.x1, j.w);
                if (j.d) {
                    k.fillRect(a.x1, j.w + 1, a.x2 - a.x1, j.w)
                }
                line_h = Math.max(line_h, j.d ? j.w * 2 + 1 : j.w)
            }
            b = $("#preview-line").clone().removeAttr("id").attr({
                width: model.width,
                height: line_h
            }).get(0);
            if (b.getContext) {
                h = b.getContext("2d");
                h.drawImage(g, 0, 0, model.width, line_h, 0, 0, model.width, line_h);
                h.fillStyle = "#000000";
                for (f in vline) {
                    a = vline[f];
                    j = line_convert[a.style];
                    h.fillRect(a.x, 0, j.w, b.height);
                    if (j.d) {
                        h.fillRect(a.x + j.w + 1, 0, j.w, b.height)
                    }
                }
                k.clearRect(0, 0, g.width, g.height)
            }
        }
        $("#preview-paper").append(b);
        no_rotate_part[current_canvas_line] = 0;
        current_canvas_line = current_canvas_line + 1;
        hline = [];
        line_x = 0;
        line_w = 0;
        line_h = 0
    }
}

function drawIcon(k, m) {
    var f, h, a = 0,
        g, b, j;
    if (hline.length > 0) {
        drawHLine()
    }
    f = $("#preview-line").clone().removeAttr("id").attr({
        width: model.width,
        height: 48
    }).get(0);
    if (f.getContext) {
        h = f.getContext("2d");
        h.fillStyle = "#000000";
        for (g in vline) {
            b = vline[g];
            j = line_convert[b.style];
            h.fillRect(b.x, 0, j.w, f.height);
            if (j.d) {
                h.fillRect(b.x + j.w + 1, 0, j.w, f.height)
            }
        }
        if (rotate) {
            h.translate(model.width, 48);
            h.rotate(Math.PI)
        }
        if (align != "left") {
            a = (model.width - 40) / (align == "right" ? 1 : 2)
        }
        h.shadowBlur = 4;
        h.shadowColor = "#000000";
        h.drawImage(k, a + 4, 8);
        h.shadowBlur = 1;
        h.font = "12px sans-serif";
        h.textBaseline = "middle";
        if (align == "right") {
            h.textAlign = "right";
            h.fillText(m, a - 4, 24)
        } else {
            h.textAlign = "left";
            h.fillText(m, a + 44, 24)
        }
        h.shadowBlur = 0;
        h.setTransform(1, 0, 0, 1, 0, 0)
    }
    $("#preview-paper").append(f);
    no_rotate_part[current_canvas_line] = 0;
    current_canvas_line = current_canvas_line + 1;
    line_x = 0;
    line_w = 0;
    line_h = 0
}

function drawFixedIcon(f, g) {
    var a, b;
    if (hline.length > 0) {
        drawHLine()
    }
    a = $("#preview-line").clone().removeAttr("id").attr({
        width: model.width,
        height: 48
    }).get(0);
    if (a.getContext) {
        b = a.getContext("2d");
        b.shadowBlur = 4;
        b.shadowColor = "#000000";
        b.drawImage(f, 4, 8);
        b.shadowBlur = 1;
        b.font = "12px sans-serif";
        b.textBaseline = "middle";
        b.textAlign = "left";
        b.fillText(g, 44, 24);
        b.shadowBlur = 0
    }
    $("#preview-paper").append(a);
    no_rotate_part[current_canvas_line] = 1;
    current_canvas_line = current_canvas_line + 1
}

function drawImage(j, k, o, u, s, p) {
    var f, b, r, t, n, q = 0,
        m, g, a;
    if (hline.length > 0) {
        drawHLine()
    }
    if (p) {
        t = model.width;
        n = j.height * t / j.width | 0
    } else {
        t = Math.min(j.width, model.width);
        n = j.height
    }
    f = $("#preview-line").clone().removeAttr("id").attr({
        width: model.width,
        height: n
    }).get(0);
    if (f.getContext) {
        b = f.getContext("2d");
        if (align != "left" && model.width > t) {
            q = (model.width - t) / (align == "right" ? 1 : 2)
        }
        if (p) {
            b.drawImage(j, q, 0, t, n)
        } else {
            b.drawImage(j, 0, 0, t, n, q, 0, t, n)
        }
        r = b.getImageData(q, 0, t, n);
        if (o == "gray16") {
            toGrayImage(r, u)
        } else {
            toMonoImage(r, s, u, color_convert[k])
        }
        b.putImageData(r, q, 0);
        for (m in vline) {
            g = vline[m];
            a = line_convert[g.style];
            b.fillRect(g.x, 0, a.w, f.height);
            if (a.d) {
                b.fillRect(g.x + a.w + 1, 0, a.w, f.height)
            }
        }
    }
    $("#preview-paper").append(f);
    no_rotate_part[current_canvas_line] = 0;
    current_canvas_line = current_canvas_line + 1;
    line_x = 0;
    line_w = 0;
    line_h = 0
}

function drawPageText(j) {
    var a, g, h, f, b;
    if (hline.length > 0) {
        drawHLine()
    }
    a = $("#preview-area").get(0);
    if (a.getContext) {
        g = a.getContext("2d");
        g.textAlign = "left";
        g.textBaseline = "alphabetic"
    }
    e = j.match(/[\ud800-\udbff][\udc00-\udfff]|[\u304B\u304D\u304F\u3051\u3053\u30AB\u30AD\u30AF\u30B1\u30B3\u30BB\u30C4\u30C8\u31F7]\u309A|[\u00E6\u0254\u028C\u0259\u025A]\u0300|[\u0254\u028C\u0259\u025A]\u0301|\u02E9\u02E5|\u02E5\u02E9|[^\ud800-\udfff]/g) || [];
    for (f = 0; f < e.length; f++) {
        h = e[f];
        switch (h) {
            case "\t":
                if (page_x == (page_dir.w ? area_w : area_h)) {
                    drawPageFeed(page_linespc)
                }
                b = font_a * 4;
                page_x = Math.floor(page_x / b) * b + b;
                if (page_x > (page_dir.w ? area_w : area_h)) {
                    drawPageFeed(page_linespc)
                }
                break;
            case "\n":
                drawPageFeed(page_linespc);
                break;
            case "\r":
                break;
            default:
                drawPageChar(g, h);
                break
        }
    }
}

function drawPageChar(f, i) {
    var a, j, b, g;
    f.font = "24px " + font;
    if (f.measureText(i).width < 18) {
        g = model.ank[text_f];
        if (g == 0) {
            g = font_a
        } else {
            font_a = g
        }
        b = g / 2
    } else {
        g = model.kanji[text_f];
        if (g == 0) {
            g = font_k
        } else {
            font_k = g
        }
        b = g
    }
    f.font = (g - 2) + "px " + font;
    if (page_x + b * text_w > (page_dir.w ? area_w : area_h)) {
        drawPageFeed(page_linespc)
    }
    a = page_x / text_w;
    j = page_y / text_h;
    f.fillStyle = text_c;
    f.strokeStyle = text_c;
    f.shadowColor = text_c;
    if (page_dir.w) {
        f.setTransform(text_w, 0, 0, text_h, 0, 0);
        f.translate(page_dir.x * area_w / text_w, page_dir.y * area_h / text_h);
        f.rotate(page_dir.r)
    } else {
        f.setTransform(text_h, 0, 0, text_w, 0, 0);
        f.translate(page_dir.x * area_w / text_h, page_dir.y * area_h / text_w);
        f.rotate(page_dir.r)
    }
    if (text_r) {
        f.fillRect(a, j, b, -g);
        c = "#f0f0f0";
        f.fillStyle = c;
        f.strokeStyle = c;
        f.shadowColor = c
    }
    if (b == g && text_l == "en") {
        f.strokeRect(a + 2, j - 2, b - 4, 4 - g)
    } else {
        f.shadowBlur = text_s ? 2 : 0;
        f.fillText(i, a, j - 4);
        if (text_e) {
            f.fillText(i, a + 1, j - 4)
        }
        f.shadowBlur = 0
    }
    if (text_u) {
        f.fillRect(a, j - 1, b, 1)
    }
    f.setTransform(1, 0, 0, 1, 0, 0);
    page_x += b * text_w;
    area_valid = true
}

function drawPageFeed(a) {
    page_x = 0;
    page_y += a
}

function drawPageIcon(f, g, h) {
    var a, b;
    a = $("#preview-area").get(0);
    if (a.getContext) {
        b = a.getContext("2d");
        b.translate(page_dir.x * area_w, page_dir.y * area_h);
        b.rotate(page_dir.r);
        b.shadowBlur = 4;
        b.shadowColor = "#000000";
        b.drawImage(f, page_x + 4, page_y + (h ? 8 : -39));
        b.shadowBlur = 1;
        b.font = "12px sans-serif";
        b.textBaseline = "middle";
        b.textAlign = "left";
        b.fillText(g, page_x + 44, page_y + (h ? 24 : -23));
        b.shadowBlur = 0;
        b.setTransform(1, 0, 0, 1, 0, 0)
    }
    page_x += 48;
    area_valid = true
}

function drawPageImage(f, g, j, q, n, k) {
    var b, a, l, p, m, o, i;
    b = $("#epos-image").get(0);
    if (k) {
        o = page_dir.w ? area_w : area_h;
        i = f.height * o / f.width | 0
    } else {
        o = Math.min(f.width, page_dir.w ? area_w : area_h);
        i = f.height
    }
    b.width = o;
    b.height = i;
    if (j != "gray16") {
        l = $("#preview-area").get(0);
        if (b.getContext && l.getContext) {
            a = b.getContext("2d");
            p = l.getContext("2d");
            a.clearRect(0, 0, o, i);
            if (k) {
                a.drawImage(f, 0, 0, o, i)
            } else {
                a.drawImage(f, 0, 0, o, i, 0, 0, o, i)
            }
            m = a.getImageData(0, 0, o, i);
            toMonoImage(m, n, q, color_convert[g]);
            a.putImageData(m, 0, 0);
            p.translate(page_dir.x * area_w, page_dir.y * area_h);
            p.rotate(page_dir.r);
            p.drawImage(b, page_x, page_y - i + 1);
            p.setTransform(1, 0, 0, 1, 0, 0)
        }
        area_valid = true
    }
}

function drawPageLine(f, j, a, h, i) {
    var b, g;
    b = $("#preview-area").get(0);
    if (b.getContext) {
        g = b.getContext("2d");
        g.translate(page_dir.x * area_w, page_dir.y * area_h);
        g.rotate(page_dir.r);
        g.fillStyle = "#000000";
        if (j == h) {
            g.fillRect(f, j, a - f, i.w);
            if (i.d) {
                g.fillRect(f, j + i.w + 1, a - f, i.w)
            }
        } else {
            if (f == a) {
                g.fillRect(f, j, i.w, h - j);
                if (i.d) {
                    g.fillRect(f + i.w + 1, j, i.w, h - j)
                }
            }
        }
        g.setTransform(1, 0, 0, 1, 0, 0)
    }
    area_valid = true
}

function drawPageRect(f, j, a, h, i) {
    var b, g;
    b = $("#preview-area").get(0);
    if (b.getContext) {
        g = b.getContext("2d");
        g.translate(page_dir.x * area_w, page_dir.y * area_h);
        g.rotate(page_dir.r);
        g.fillStyle = "#000000";
        g.fillRect(f, j, a - f, i.w);
        g.fillRect(f, j, i.w, h - j);
        g.fillRect(a, h, f - a, -i.w);
        g.fillRect(a, h, -i.w, j - h);
        if (i.d) {
            d = i.w + 1;
            g.fillRect(f + d, j + d, a - f - d - d, i.w);
            g.fillRect(f + d, j + d, i.w, h - j - d - d);
            g.fillRect(a - d, h - d, f - a + d + d, -i.w);
            g.fillRect(a - d, h - d, -i.w, j - h + d + d)
        }
        g.setTransform(1, 0, 0, 1, 0, 0)
    }
    area_valid = true
}

function moveAreaToPage() {
    var b = $("#preview-area").get(0),
        g = $("#preview-page").get(0),
        f, a;
    if (area_valid) {
        if (b.getContext && g.getContext) {
            f = b.getContext("2d");
            a = g.getContext("2d");
            a.drawImage(b, 0, 0, area_w, area_h, area_x, area_y, area_w, area_h);
            f.clearRect(0, 0, b.width, b.height)
        }
        page_h = Math.max(page_h, area_y + area_h)
    }
}

function drawPage() {
    var f, b, o, g, m, k, j, a, n;
    m = Math.min(page_h, model.page.max_h);
    if (m == 0) {
        m = model.page.ini_h
    }
    f = $("#preview-line").clone().removeAttr("id").attr({
        width: model.width,
        height: m
    }).get(0);
    o = $("#preview-page").get(0);
    if (f.getContext && o.getContext) {
        b = f.getContext("2d");
        g = o.getContext("2d");
        b.drawImage(o, 0, 0, model.width, m, 0, 0, model.width, m);
        g.clearRect(0, 0, o.width, o.height)
    }
    $("#preview-paper").append(f);
    no_rotate_part[current_canvas_line] = 0;
    current_canvas_line = current_canvas_line + 1
}

function RotatePage(j) {
    if (hline.length > 0) {
        drawHLine()
    }
    $("#preview-rotate").width(model.width);
    var k = 0,
        m = 0;
    var o = $("#preview-rotate").clone().removeAttr("id").attr({
        width: model.width,
        height: model.height
    }).get(0);
    var i = o.getContext("2d");
    i.translate(o.width, o.height);
    i.rotate(Math.PI);
    var f = $("#preview-rotate").clone().removeAttr("id").attr({
        width: model.width,
        height: model.height
    }).get(0);
    var n = f.getContext("2d");
    var h = 0;
    var l = 0;
    $("#preview-paper canvas").each(function () {
        if (h >= j && no_rotate_part[h] == 0) {
            var r = $(this).get(0),
                p;
            p = r.getContext("2d");
            i.drawImage(r, 0, k);
            k = k + r.height;
            $(this).remove()
        }
        if (h >= j && no_rotate_part[h] == 1) {
            var q = Math.min(k, model.page.max_h);
            if (q > 0) {
                n.drawImage(o, 0, o.height - q, model.width, q, 0, l, model.width, q);
                l = l + q
            }
            var r = $(this).get(0),
                p;
            p = r.getContext("2d");
            n.drawImage(r, 0, l);
            l = l + r.height;
            i.clearRect(0, 0, o.width, o.height);
            k = 0;
            $(this).remove()
        }
        h = h + 1
    });
    if (k > 0) {
        var g = Math.min(k, model.page.max_h);
        n.drawImage(o, 0, o.height - g, model.width, g, 0, l, model.width, g);
        l = l + g;
        i.clearRect(0, 0, o.width, o.height)
    }
    if (l > 0) {
        var g = Math.min(l, model.page.max_h);
        var b = $("#preview-line").clone().removeAttr("id").attr({
            width: model.width,
            height: g
        }).get(0);
        var a = b.getContext("2d");
        a.drawImage(f, 0, 0, model.width, g, 0, 0, model.width, g);
        $("#preview-paper").append(b);
        current_canvas_line = j + 1;
        no_rotate_part = [];
        n.clearRect(0, 0, f.width, f.height)
    }
    $("#preview-rotate").height(0)
}

function toMonoImage(D, z, I, M) {
    var m = String.fromCharCode,
        O = [
            [2, 130, 34, 162, 10, 138, 42, 170],
            [194, 66, 226, 98, 202, 74, 234, 106],
            [50, 178, 18, 146, 58, 186, 26, 154],
            [242, 114, 210, 82, 250, 122, 218, 90],
            [14, 142, 46, 174, 6, 134, 38, 166],
            [206, 78, 238, 110, 198, 70, 230, 102],
            [62, 190, 30, 158, 54, 182, 22, 150],
            [254, 126, 222, 94, 246, 118, 214, 86]
        ],
        L = D.data,
        o = D.width,
        H = D.height,
        a = parseInt(M.slice(1, 3), 16),
        u = parseInt(M.slice(3, 5), 16),
        B = parseInt(M.slice(5, 7), 16),
        E = 0,
        C = 0,
        A = 0,
        y = 128,
        K = new Array(),
        l, k, N, r, J, G, F;
    if (z == 1) {
        G = o;
        while (G--) {
            K.push(0)
        }
    }
    for (F = 0; F < H; F++) {
        l = 0;
        k = 0;
        G = 0;
        while (G < o) {
            N = G & 7;
            if (z == 0) {
                y = O[F & 7][N]
            }
            r = Math.pow(((L[C++] * 0.29891 + L[C++] * 0.58661 + L[C++] * 0.11448) * L[C] / 255 + 255 - L[C++]) / 255, 1 / I) * 255 | 0;
            if (z == 1) {
                r += K[G] + l >> 4;
                J = r - (r < y ? 0 : 255);
                if (G > 0) {
                    K[G - 1] += J
                }
                K[G] = J * 7 + k;
                l = J * 5;
                k = J * 3
            }
            E = r < y ? 0 : 255;
            L[A++] = Math.max(E, a);
            L[A++] = Math.max(E, u);
            L[A++] = Math.max(E, B);
            L[A++] = 255 - E;
            G++
        }
    }
}

function toGrayImage(u, r) {
    var y = String.fromCharCode,
        B = [
            [0, 9, 2, 11],
            [13, 4, 15, 6],
            [3, 12, 1, 10],
            [16, 7, 14, 5]
        ],
        s = u.data,
        A = u.width,
        o = u.height,
        k = 0,
        f = 0,
        a = 0,
        t, C, z, m, l;
    for (l = 0; l < o; l++) {
        m = 0;
        while (m < A) {
            t = m & 1;
            C = Math.pow(((s[f++] * 0.29891 + s[f++] * 0.58661 + s[f++] * 0.11448) * s[f] / 255 + 255 - s[f++]) / 255, 1 / r) * 255 | 0;
            z = C / 17 | 0;
            if (B[l & 3][m & 3] < C % 17) {
                z++
            }
            k = z << 4;
            s[a++] = k;
            s[a++] = k;
            s[a++] = k;
            s[a++] = 255;
            m++
        }
    }
};
var printer = null;
var ePosDev = null;
var printCallback = null;

function cbConnect(b) {
    if (b == "OK" || b == "SSL_CONNECT_OK") {
        ePosDev.createDevice($("#setting-devid").val(), ePosDev.DEVICE_TYPE_PRINTER, {
            crypto: false,
            buffer: false
        }, cbCreateDevice_printer)
    } else {
        addPrintInfo(message.epos_error + " (" + b + ")")
    }
}

function cbCreateDevice_printer(c, d) {
    if (d == "OK") {
        printer = c;
        printer.timeout = $("#setting-timeout").val();
        printer.onreceive = function (a) {
            if (a.printjobid.length > 0) {
                addPrintInfo((a.success ? message.success + " (" : message.failure + " (" + message.epos_code + ": " + a.code + ", ") + message.epos_jobid + ": " + a.printjobid + ")")
            } else {
                addPrintInfo(a.success ? message.success : message.failure + " (" + message.epos_code + ": " + a.code + ")")
            }
        };
        printer.onerror = function (a) {
            addPrintInfo(message.epos_error + " (" + message.epos_status + ": " + a.status + ")")
        };
        printer.ononline = function () {
            addPrintInfo(message.epos_online)
        };
        printer.onoffline = function () {
            addPrintInfo(message.epos_offline)
        };
        printer.onpoweroff = function () {
            addPrintInfo(message.epos_poweroff)
        };
        printer.oncoverok = function () {
            addPrintInfo(message.epos_coverok)
        };
        printer.oncoveropen = function () {
            addPrintInfo(message.epos_coveropen)
        };
        printer.onpaperok = function () {
            addPrintInfo(message.epos_paperok)
        };
        printer.onpapernearend = function () {
            addPrintInfo(message.epos_papernearend)
        };
        printer.onpaperend = function () {
            addPrintInfo(message.epos_paperend)
        };
        printer.ondrawerclosed = function () {
            addPrintInfo(message.epos_drawerclosed)
        };
        printer.ondraweropen = function () {
            addPrintInfo(message.epos_draweropen)
        };
        printer.onbatterylow = function () {
            addPrintInfo(message.epos_batterylow)
        };
        printer.onbatteryok = function () {
            addPrintInfo(message.epos_batteryok)
        };
        printer.onbatterystatuschange = function (a) {
            if (a > 0) {
                addPrintInfo(message.epos_batterystatus + ": 0x" + ("000" + a.toString(16)).slice(-4))
            }
        };
        setStatusMonitor();
        if (printCallback) {
            printCallback();
            printCallback = null
        }
    } else {
        addPrintInfo(message.epos_error + " (" + d + ")")
    }
}

function connectPrinter() {
    if (ePosDev == null) {
        ePosDev = new epson.ePOSDevice()
    }
    ePosDev.ondisconnect = function () {
        printer = null
    };
    $(window).bind("beforeunload", function (b) {
        return message.unload
    });
    ePosDev.connect($("#setting-ipaddr").val(), $("#setting-port").val(), cbConnect)
}

function setPrintDoc(b) {
    $("#print-doc").val(b)
}

function sendPrintDoc() {
    if (printer) {
        doSendPrintDoc()
    } else {
        printCallback = doSendPrintDoc;
        connectPrinter()
    }
}

function doSendPrintDoc() {
    var d;
    if (printer) {
        try {
            d = $($.parseXML($("#print-doc").val())).find("epos-print");
            if (d.size() == 0) {
                throw new Error(message.import_noelem)
            }
            if (/^(1|true)$/.test(d.attr("force"))) {
                printer.force = true
            }
            printer.setXmlString($("#print-doc").val().replace(/< *\/? *epos-print(.+\".*?\")* *>/g, ""))
        } catch (c) {
            addPrintInfo(message.epos_error + " (" + c.message + ")");
            return
        }
        if ($("#setting-jobid").is(":checked")) {
            now = new Date();
            jobid = "E" + now.getHours() + ("0" + now.getMinutes()).slice(-2) + ("0" + now.getSeconds()).slice(-2) + ("00" + now.getMilliseconds()).slice(-3);
            printer.send(jobid);
            addPrintInfo(message.epos_send + " (" + message.epos_jobid + ": " + jobid + ")")
        } else {
            printer.send();
            addPrintInfo(message.epos_send)
        }
    } else {
        addPrintInfo(message.epos_error)
    }
}

function setStatusMonitor() {
    if (printer) {
        if ($("#setting-status").is(":checked")) {
            if (!printer.enabled) {
                printer.startMonitor();
                addPrintInfo(message.epos_open)
            }
        } else {
            if (printer.enabled) {
                printer.stopMonitor();
                addPrintInfo(message.epos_close)
            }
        }
        if ($("#setting-drawer").val() == "high") {
            printer.drawerOpenLevel = printer.DRAWER_OPEN_LEVEL_HIGH
        } else {
            printer.drawerOpenLevel = printer.DRAWER_OPEN_LEVEL_LOW
        }
    }
}

function addPrintInfo(g) {
    var e = new Date(),
        f = [e.getFullYear(), ("0" + (e.getMonth() + 1)).slice(-2), ("0" + e.getDate()).slice(-2)].join("-"),
        h = [e.getHours(), ("0" + e.getMinutes()).slice(-2), ("0" + e.getSeconds()).slice(-2)].join(":");
    $("#print-info").val($("#print-info").val() + f + " " + h + " " + g + "\n").change()
};
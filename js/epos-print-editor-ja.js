/*! Receipt Designer for ePOS SDK Copyright Seiko Epson Corporation 2016 - 2017 All rights reserved. */

// 機種情報
var modelinfo = {
    tm_t88_80: {
        width: 512,
        linespc: 30,
        ank: { font_a: 24, font_b: 18, font_c: 0, font_d: 0, font_e: 0, special_a: 24, special_b: 18 },
        kanji: { font_a: 24, font_b: 0, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 512, ini_h: 831, max_w: 512, max_h: 1662 }
    },
    tm_t88_58: {
        width: 360,
        linespc: 30,
        ank: { font_a: 24, font_b: 18, font_c: 0, font_d: 0, font_e: 0, special_a: 24, special_b: 18 },
        kanji: { font_a: 24, font_b: 0, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 360, ini_h: 831, max_w: 360, max_h: 1662 }
    },
    tm_t70_80: {
        width: 576,
        linespc: 30,
        ank: { font_a: 24, font_b: 16, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 16, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 576, ini_h: 1662, max_w: 576, max_h: 1662 }
    },
    tm_t70_58: {
        width: 416,
        linespc: 30,
        ank: { font_a: 24, font_b: 16, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 16, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 416, ini_h: 1662, max_w: 416, max_h: 1662 }
    },
    tm_t90_80: {
        width: 576,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 576, ini_h: 738, max_w: 576, max_h: 1476 }
    },
    tm_t90_58: {
        width: 420,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 420, ini_h: 738, max_w: 420, max_h: 1476 }
    },
    tm_t90_kp: {
        width: 576,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 576, ini_h: 738, max_w: 576, max_h: 1476 }
    },
    tm_l90_re: {
        width: 576,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 576, ini_h: 738, max_w: 576, max_h: 1476 }
    },
    tm_l90_la: {
        width: 560,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 560, ini_h: 738, max_w: 560, max_h: 1476 }
    },
    tm_p80_80: {
        width: 576,
        linespc: 30,
        ank: { font_a: 24, font_b: 18, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 576, ini_h: 1662, max_w: 576, max_h: 1662 }
    },
    tm_p60_60: {
        width: 432,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 0, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 432, ini_h: 1624, max_w: 432, max_h: 1624 }
    },
    tm_p60_58: {
        width: 420,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 0, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 420, ini_h: 1624, max_w: 420, max_h: 1624 }
    },
    tm_p60_la: {
        width: 400,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 0, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 400, ini_h: 1624, max_w: 400, max_h: 1624 }
    },
    tm_t20_80: {
        width: 576,
        linespc: 30,
        ank: { font_a: 24, font_b: 18, font_c: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 0, font_c: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 576, ini_h: 831, max_w: 576, max_h: 1662 }
    },
    tm_t20_58: {
        width: 420,
        linespc: 30,
        ank: { font_a: 24, font_b: 18, font_c: 0, special_a: 0, special_b: 0 },
        kanji: { font_a: 24, font_b: 0, font_c: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 420, ini_h: 831, max_w: 420, max_h: 1662 }
    },
    tm_p20_58: {
        width: 384,
        linespc: 30,
        ank: { font_a: 24, font_b: 18, font_c: 18, font_d: 20, font_e: 16, special_a: 24, special_b: 18 },
        kanji: { font_a: 24, font_b: 20, font_c: 16, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 384, ini_h: 2400, max_w: 384, max_h: 2400 }
    },
    tm_m10_58: {
        width: 420,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 18, font_d: 0, font_e: 0, special_a: 24, special_b: 18 },
        kanji: { font_a: 24, font_b: 20, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 420, ini_h: 2400, max_w: 420, max_h: 2400 }
    },
    tm_m30_80: {
        width: 576,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 18, font_d: 0, font_e: 0, special_a: 24, special_b: 18 },
        kanji: { font_a: 24, font_b: 20, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 576, ini_h: 2400, max_w: 576, max_h: 2400 }
    },
    tm_m30_58: {
        width: 420,
        linespc: 30,
        ank: { font_a: 24, font_b: 20, font_c: 18, font_d: 0, font_e: 0, special_a: 24, special_b: 18 },
        kanji: { font_a: 24, font_b: 20, font_c: 0, font_d: 0, font_e: 0, special_a: 0, special_b: 0 },
        page: { ini_w: 420, ini_h: 2400, max_w: 420, max_h: 2400 }
    }
};

// メッセージ
var message = {
    yes: 'はい',
    no: 'いいえ',
    close: '閉じる',
    ok: 'OK',
    line: '行',
    success: '印刷成功',
    failure: '印刷失敗',
    epos_code: 'エラーコード',
    epos_status: 'HTTP ステータスコード',
    epos_error: '送信エラー',
    epos_online: 'オンライン',
    epos_offline: 'オフライン',
    epos_poweroff: 'プリンター無応答',
    epos_coverok: 'カバークローズ',
    epos_coveropen: 'カバーオープン',
    epos_paperok: '用紙あり',
    epos_papernearend: '用紙ニアエンド',
    epos_paperend: '用紙エンド',
    epos_drawerclosed: 'ドロアークローズ',
    epos_draweropen: 'ドロアーオープン',
    epos_batterylow: 'バッテリー残量なし (TM-P60II, TM-P20)',
    epos_batteryok: 'バッテリー残量あり (TM-P60II, TM-P20)',
    epos_batterystatus: 'バッテリーステータス',
    epos_send: '送信',
    epos_open: 'オープン',
    epos_close: 'クローズ',
    epos_jobid: '印刷ジョブID',
    import_noelem: 'ルート要素が見つかりません。',
    import_noattr: ' 要素は無視されました。この要素は次の属性が必要です: ',
    import_inelem: ' 要素は無視されました。この要素は無効です。',
    import_inattr: ' 要素は無視されました。次の属性は無効です: ',
    import_intext: ' 要素は無視されました。内容が不正です。',
    import_complete: 'インポート処理が完了しました。',
    import_abort: 'インポート処理が中止されました。',
    unload: '編集中のデータは消去されます。'
};

// フォント
var font = '"MS Gothic", "Osaka-Mono", monospace';

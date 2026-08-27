const GH = "https://raw.githubusercontent.com/";
    const R0 = GH + "zhamuqiu/tongren2/refs/heads/main";
    const R1 = GH + "roxysl521-droid/linanan_xiaoma/main";
    const R2 = GH + "xuanyuy2019-ops/Image/main/shenyan";
    const R3 = GH + "duonglanoanh503-code/-/4067b674693f175f4052f3264843b86ea160a71e";
    const R4 = GH + "duonglanoanh503-code/-/a732fb2afff13c00609e7e2adc5d193d1485192a";
    const R5 = GH + "xm212617-code/-/1b9e52ffecb0e75a013964b85282e65588db7168";
    const R6 = GH + "duonglanoanh503-code/-/b27295ffa77f14f97a7f03eb82e55c184e81a040";
    const R7 = GH + "xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d";
    const R8 = GH + "duonglanoanh503-code/-/bd10a003f0e42e1fb78c99af19b5e33561760dc0";
    const R9 = GH + "AliceNekoqqq/Pic/master/img";
    const R10 = GH + "duonglanoanh503-code/-/a60df006222d2456375d4a4a82cccb5c891637c6";
    const R11 = GH + "KronosXup/bangshou-art/main/yunyi";
    const R12 = GH + "duonglanoanh503-code/-/8195007a0f25527f04922b22e343d6f0e52471fa";
    const R13 = GH + "duonglanoanh503-code/-/67d4f29d81f3b33f08600df4ebb8f6713a4c8e97";
    const R14 = GH + "duonglanoanh503-code/-/c242d95f0061c1d51eaecf07be6b9e41f931dc82";
    const R15 = GH + "duonglanoanh503-code/-/b772f1238d8f170b52bd87d407e13a9609aec57c";
    const R16 = GH + "xm212617-code/-/0381ce2b377901d357c010fcd23a1989b0024384";
    const R17 = GH + "xm212617-code/-/e618684d9d3ec0f61098e77caa94790280172fce";
    const R18 = GH + "duonglanoanh503-code/-/ef624a92337bc56159e82e5fe2d862a669b9b8b9";
    const R19 = GH + "duonglanoanh503-code/-/120acb564978aeb91f907320dbae32384dbad0d9";
    const R20 = GH + "duonglanoanh503-code/-/b90d73298806755d2272f0c8a80771d4665a5712";
    const R21 = GH + "KronosXup/bangshou-art/main/peihan";
    const R22 = GH + "duonglanoanh503-code/-/fec4c0286db909a1576ddd3745856a3fadb7271f";
    const R23 = GH + "xm212617-code/-/666daf0c5d5831009fc91f5009e4bba5cbbcba6b";
    const R24 = GH + "duonglanoanh503-code/-/2bf4f2541f5b92134bad72276e0c25ec11cf49a7";
    const R25 = GH + "495996581-coder/image/main/xiancheng";
    const R26 = GH + "duonglanoanh503-code/-/c473aa71af653948434c690ef74eeb76990f2b79";
    const R27 = GH + "duonglanoanh503-code/-/387d9f4f74c153f88c0303dbcf5c55e12ae06166";
    const R28 = GH + "xuanyuy2019-ops/Image/main/han";
    const R29 = GH + "HaoX520/-/refs/heads/main/zhu_yue";
    const R30 = GH + "duonglanoanh503-code/-/f3401d447cb94253263c62c97779d95437c1432c";
    const R31 = GH + "duonglanoanh503-code/-/d86430fb7ea0109a8a594a52162225f3cc729beb";
    const R32 = GH + "vmkudz-sys/my-image-bed/main";
    const R33 = GH + "duonglanoanh503-code/-/05b8ba0a3251ec6b7512198700a778407ec81338";
    const R34 = GH + "yiliya443290-a11y/-/main";
    const R35 = GH + "LonSha/xiancheng/main";
    const R36 = GH + "xm212617-code/-/0d4a190e2d2e33f49455593975c7ec53fa91faab";
    const R37 = GH + "xm212617-code/-/1fb85db6d57b7ec7705543aacbaa1e5b92d3d303";
    const R38 = GH + "HaoX520/-/refs/heads/main/zhu_juexiang";
    const R39 = GH + "xm212617-code/-/b6d31a1e2acf200b038a68233a9d1b726c0a4b13";
    const R40 = GH + "duonglanoanh503-code/-/f014ec4c445df74500b1f5af6f181eab91b6ebd8";
    const R41 = GH + "duonglanoanh503-code/-/0c71e47b316ce95a47200d04fc469a363fad0f29";
    const R42 = GH + "AliceNekoqqq/Pic/master/img/2.png";
    const R43 = GH + "AliceNekoqqq/Pic/master/img/1.png";
    const R44 = GH + "ningj8622-coder/-1/554d68072b068abbc69fcffc9e1ce657af209c21";R45 = GH + "ningj8622-coder/-1/8ce3b51cff803e8db22e90b8639b1cd6a6efcd8d";

    // ==========================================
    // 🔮 预设配置区
    // ==========================================
    const VARIANT_PRESETS = {
      modern: {
        label: "现代",
        sfw: [
          { key: "uniform", label: "制服" },
          { key: "daily", label: "日常" },
          { key: "outing", label: "外出" },
          { key: "nsfw", label: "赤裸" },
        ],
        nsfw: [
          { key: "blowjob", label: "口交" },
          { key: "footjob", label: "足交" },
          { key: "holding_pee", label: "憋尿" },
          { key: "sex", label: "性交" },
          { key: "anal", label: "肛交" },
          { key: "orgasm", label: "高潮" },
          { key: "anal_training", label: "肛门调教" },
          { key: "training", label: "调教" },
          { key: "exhibition", label: "露出" },
          { key: "vulva_selfie", label: "阴部自拍" },
          { key: "nude_selfie", label: "全裸自拍" },
          { key: "outdoor_selfie", label: "户外露出自拍" },
          { key: "indoor_selfie", label: "室内露出自拍" },
        ],
      },
      traveler: {
        label: "异界",
        sfw: [
          { key: "outing", label: "外出" },
          { key: "daily", label: "居家" },
          { key: "nsfw", label: "赤裸" },
        ],
        nsfw: [
          { key: "nipple_training", label: "乳头调教" },
          { key: "blowjob", label: "口交" },
          { key: "sex", label: "性交" },
          { key: "anal", label: "肛交" },
          { key: "bondage_training", label: "捆绑调教" },
          { key: "body_graffiti", label: "身体涂鸦" },
          { key: "choking_training", label: "窒息调教" },
          { key: "holding_pee", label: "憋尿" },
          { key: "urethra_training", label: "尿道调教" },
          { key: "orgasm", label: "高潮" },
        ],
      },
      xiaoma: {
        label: "小马",
        sfw: [
          { key: "outing", label: "外出" },
          { key: "underwear", label: "内衣" },
          { key: "nsfw", label: "赤裸" },
        ],
        nsfw: [
          { key: "nipple_training", label: "乳头调教" },
          { key: "pussy_training", label: "阴部调教" },
          { key: "blowjob", label: "口交" },
          { key: "sex", label: "性交" },
          { key: "anal", label: "肛交" },
          { key: "bondage", label: "捆绑调教" },
          { key: "body_writing", label: "身体涂鸦" },
          { key: "choking", label: "窒息调教" },
          { key: "holding_pee", label: "憋尿" },
          { key: "urethral_training", label: "尿道调教" },
          { key: "gangbang_creampie", label: "群交射精" },
          { key: "gangbang_aftermath", label: "群交事后" },
          { key: "orgasm", label: "高潮" },
          { key: "cowgirl", label: "女上位" },
        ],
      },
    };

    const NO_VULVA_SELFIE_CHARS = [
      "zhou_yutong", "zhu_peiling", "lin_anan", "wu_haiwen", "sun_ruixi",
      "zhu_yegu", "lun_xintong", "wen_xin", "wen_lan", "hong_xintong",
      "he_ling", "suyu", "chen_shuting", "ma_qi", "yuan_liping",
      "jin_ning", "wen_su_da", "sun_yuanqing", "ming_xiangxiang",
      "wen_ruoning", "zhou_ling", "hai_lin", "zhao_ziyou", "su_wantang",
      "yunyi", "peihan", "chen_si_yu", "su_zi_ning", "shen_yang",
      "rong_rourou", "xu_mingwei", "liu_yuan", "han_bingjiao",
      "bai_xiaoxue", "liu_qiyin", "lin_wenxia", "xu_yuanji", "xu_yuan",
      "luo_hua", "yang_can", "zhao_shiqing", "zhu_juexiang", "zhu_yue",
      "zhi_yun",
      "luo_ke_ke",
    ];

    const NO_NUDE_SELFIE_CHARS = ["tang_mi"];
    const NO_SELFIE_CHARS = ["anlin", "shujing", "lanxin", "sunqi"];

    // ==========================================
    // 🔮 第二版立绘图床配置区
    // ==========================================
    const VERSION2_CONFIG = {
      sun_yitong: { sfwBase: GH+"ningj8622-coder/-1/56e321c094ebeae18125450ecb7c91c64e1c75e5", nsfwBase: GH+"ningj8622-coder/-1/56e321c094ebeae18125450ecb7c91c64e1c75e5", overrides: {} },
      zhang_ziwei: { sfwBase: GH+"ningj8622-coder/-1/61b4b92a7c0ddd361fdcfa174fc1e97a398c6bd7", nsfwBase: GH+"ningj8622-coder/-1/61b4b92a7c0ddd361fdcfa174fc1e97a398c6bd7", overrides: {} },
      liu_qing: { sfwBase: GH+"ningj8622-coder/-1/03829b288b27ce3f46753b7eb325dc3031c7999c", nsfwBase: GH+"ningj8622-coder/-1/03829b288b27ce3f46753b7eb325dc3031c7999c", overrides: {} },
      li_nanxing: { sfwBase: GH+"ningj8622-coder/-1/19f1a4a98e8976e441133de769dda730670a6b7c", nsfwBase: GH+"ningj8622-coder/-1/19f1a4a98e8976e441133de769dda730670a6b7c", overrides: {} },
      jin_jingjing: { sfwBase: GH+"ningj8622-coder/-1/e6f825ab04b087e070a9f07f93cb73bb6fa14286", nsfwBase: GH+"ningj8622-coder/-1/e6f825ab04b087e070a9f07f93cb73bb6fa14286", overrides: {} },
      tang_jialin: { sfwBase: GH+"ningj8622-coder/-1/3629590f981d36cc68e3d1696349dd1de13b32b5", nsfwBase: GH+"ningj8622-coder/-1/3629590f981d36cc68e3d1696349dd1de13b32b5", overrides: {} },
      hu_jing: { sfwBase: GH+"ningj8622-coder/-1/1de1c22e45edb7830cd909de7cfbcb1877f13cea", nsfwBase: GH+"ningj8622-coder/-1/1de1c22e45edb7830cd909de7cfbcb1877f13cea", overrides: {} },
      lan_ye: { sfwBase: GH+"ningj8622-coder/-1/68e7f30618d184cc66949de0fa68b45b83c49c5f", nsfwBase: GH+"ningj8622-coder/-1/68e7f30618d184cc66949de0fa68b45b83c49c5f", overrides: {} },
      huang_shuyi: { sfwBase: GH+"ningj8622-coder/-1/c9fe2a07a5e423f6624e97124dd0c74235440a93", nsfwBase: GH+"ningj8622-coder/-1/c9fe2a07a5e423f6624e97124dd0c74235440a93", overrides: {} },
      chen_xiaobei: { sfwBase: GH+"ningj8622-coder/-1/eee6f3d0f905b743625293d4f56090311c667003", nsfwBase: GH+"ningj8622-coder/-1/eee6f3d0f905b743625293d4f56090311c667003", overrides: {} },
      luo_jia: { sfwBase: GH+"ningj8622-coder/-1/60ed3af6fbe22efcae102489306d9fab8e108863", nsfwBase: GH+"ningj8622-coder/-1/60ed3af6fbe22efcae102489306d9fab8e108863", overrides: {} },
      zhao_yaqin: { sfwBase: GH+"ningj8622-coder/-1/f7773d9105f8fbf6254406315ab0a65fa3900cd3", nsfwBase: GH+"ningj8622-coder/-1/f7773d9105f8fbf6254406315ab0a65fa3900cd3", overrides: {} },
      wen_su: { sfwBase: GH+"ningj8622-coder/-1/082b654b3c6653ee32314e0343bf5d0dc0429a3d", nsfwBase: GH+"ningj8622-coder/-1/082b654b3c6653ee32314e0343bf5d0dc0429a3d", overrides: {} },
      rang_na: { sfwBase: GH+"ningj8622-coder/-1/32eb10d95e136df704d167d01bf1f7038fcf7e5a", nsfwBase: GH+"ningj8622-coder/-1/32eb10d95e136df704d167d01bf1f7038fcf7e5a", overrides: {} },
      pang_yongxuan: { sfwBase: GH+"ningj8622-coder/-1/c749b592ebaf6044127cd98fe8051639362a2040", nsfwBase: GH+"ningj8622-coder/-1/c749b592ebaf6044127cd98fe8051639362a2040", overrides: {} },
      zhu_peiling: { sfwBase: R36, nsfwBase: R36, overrides: {} },
      lin_anan: { sfwBase: R5, nsfwBase: R5, overrides: {} },
      wu_haiwen: { sfwBase: R16, nsfwBase: R16, overrides: {} },
      sun_ruixi: { sfwBase: R7, nsfwBase: R7, overrides: { exhibition: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_exposure.png", outdoor_selfie: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_outdoor_exposure_selfie.png", indoor_selfie: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_indoor_exposure_selfie.png" } },
      zhu_yegu: { sfwBase: R37, nsfwBase: R37, overrides: {} },
      lun_xintong: { sfwBase: R18, nsfwBase: R18, overrides: {} },
      wen_xin: { sfwBase: R20, nsfwBase: R20, overrides: {} },
      wen_lan: { sfwBase: R6, nsfwBase: R6, overrides: {} },
      hong_xintong: { sfwBase: R31, nsfwBase: R31, overrides: {} },
      he_ling: { sfwBase: R8, nsfwBase: R8, overrides: {} },
      pang_ying: { sfwBase: R26, nsfwBase: R26, overrides: {} },
      dugu_chuner: { sfwBase: R13, nsfwBase: R13, overrides: {} },
      han_zhenzhen: { sfwBase: R33, nsfwBase: R33, overrides: {} },
      zhu_qing: { sfwBase: R10, nsfwBase: R10, overrides: {} },
      zhang_weiwei: { sfwBase: R24, nsfwBase: R24, overrides: {} },
      tang_qian: { sfwBase: R40, nsfwBase: R40, overrides: {} },
      ya_tao: { sfwBase: R19, nsfwBase: R19, overrides: {} },
      ma_qingqing: { sfwBase: R12, nsfwBase: R12, overrides: {} },
      wen_yuan: { sfwBase: R27, nsfwBase: R27, overrides: {} },
      dong_shiqing: { sfwBase: R3, nsfwBase: R3, overrides: {} },
      chen_yingying: { sfwBase: R15, nsfwBase: R15, overrides: {} },
      lin_anan_xiaoma: { sfwBase: R1, nsfwBase: R1, overrides: {} },
      an_chunsheng: { sfwBase: R30, nsfwBase: R30, overrides: {} },
      nake: { sfwBase: R22, nsfwBase: R22, overrides: {} },
      shaoyao: { sfwBase: R41, nsfwBase: R41, overrides: {} },
      suyu: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      chen_shuting: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      ma_qi: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      yuan_liping: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      ming_xiangxiang: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      ding_manhong: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      wen_ruoning: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      fang_min: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      lin_muyi: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      zhao_xiaoman: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      zhao_ziyou: { sfwBase: R0, nsfwBase: R0, overrides: {} },
      jin_ning: { sfwBase: GH+"duonglanoanh503-code/-/7d558a056af4cbe5d8d804d67505c80fc4bd88da", nsfwBase: GH+"duonglanoanh503-code/-/7d558a056af4cbe5d8d804d67505c80fc4bd88da", overrides: {} },
      wen_su_da: { sfwBase: R1, nsfwBase: R1, overrides: {} },
      sun_yuanqing: { sfwBase: GH+"duonglanoanh503-code/-/ca331f322201fe954018568f01494a5de324936d", nsfwBase: GH+"duonglanoanh503-code/-/ca331f322201fe954018568f01494a5de324936d", overrides: {} },
      hai_lin: { sfwBase: GH+"duonglanoanh503-code/-/c5c8255226ee5f321b5251974333cdd3fac546fe", nsfwBase: GH+"duonglanoanh503-code/-/c5c8255226ee5f321b5251974333cdd3fac546fe", overrides: {} },
      zhou_ling: { sfwBase: GH+"duonglanoanh503-code/-/3c76be53e4d7c74aa27241ea4c32d405270f06f9", nsfwBase: GH+"duonglanoanh503-code/-/3c76be53e4d7c74aa27241ea4c32d405270f06f9", overrides: {} },
      su_wantang: { sfwBase: R1, nsfwBase: R1, overrides: {} },
      yunyi: { sfwBase: R11, nsfwBase: R11, overrides: {} },
      peihan: { sfwBase: R21, nsfwBase: R21, overrides: {} },
      chen_si_yu: { sfwBase: R1, nsfwBase: R1, overrides: { nsfw: GH+"roxysl521-droid/linanan_xiaoma/main/chen_si_yu_nsfw.png", indoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/chen_si_yu_outdoor_selfie.png", outdoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/chen_si_yu_indoor_selfie.png" } },
      su_zi_ning: { sfwBase: R1, nsfwBase: R1, overrides: { indoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/su_zi_ning_outdoor_selfie.png", outdoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/su_zi_ning_indoor_selfie.png" } },
      shen_yang: { sfwBase: R9, nsfwBase: R9, overrides: { daily: R43, uniform: R42, outing: GH+"AliceNekoqqq/Pic/master/img/4.png", nsfw: GH+"AliceNekoqqq/Pic/master/img/3.png", blowjob: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E5%8F%A3%E4%BA%A4.png", footjob: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E8%B6%B3%E4%BA%A4.png", holding_pee: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%86%8B%E5%B0%BF.png", sex: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%80%A7%E4%BA%A4.png", anal: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E8%82%9B%E4%BA%A4.png", orgasm: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E9%AB%98%E6%BD%AE.png", anal_training: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E8%82%9B%E9%97%A8%E8%B0%83%E6%95%99.png", training: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E8%B0%83%E6%95%99.png", exhibition: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E9%9C%B2%E5%87%BA.png", vulva_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E9%98%B4%E9%83%A8%E8%87%AA%E6%8B%8D.png", nude_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E5%85%A8%E8%A3%B8%E8%87%AA%E6%8B%8D.png", outdoor_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%88%B7%E5%A4%96%E9%9C%B2%E5%87%BA%E8%87%AA%E6%8B%8D.png", indoor_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E5%AE%A4%E5%86%85%E9%9C%B2%E5%87%BA%E8%87%AA%E6%8B%8D.png" } },
      rong_rourou: { sfwBase: R0, nsfwBase: R0, overrides: { holding_pee: GH+"zhamuqiu/tongren2/refs/heads/main/rong_rourou_exhibition.png", exhibition: GH+"zhamuqiu/tongren2/refs/heads/main/rong_rourou_exhibtion.png", outdoor_selfie: "" } },
      xu_mingwei: { sfwBase: R0, nsfwBase: R0, overrides: { holding_pee: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_hoding_pee.png", nude_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_vulva_selfie.png", indoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_outdoor_selfie.png", outdoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_nude_selfie.png" } },
      liu_yuan: { sfwBase: R0, nsfwBase: R0, overrides: { nude_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/liu_yuan_vulva_selfie.png", indoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/liu_yuan_outdoor_selfie.png", outdoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/liu_yuan_nude_selfie.png" } },
      han_bingjiao: { sfwBase: GH+"xuanyuy2019-ops/Image/main/han/sfw", nsfwBase: GH+"xuanyuy2019-ops/Image/main/han/nsfw", overrides: { indoor_selfie: GH+"xuanyuy2019-ops/Image/main/han/nsfw/han_bingjiao_vulva_selfie.png" } },
      luo_hua: { sfwBase: R28, nsfwBase: R28, overrides: {} },
      zhou_yutong: { sfwBase: R0, nsfwBase: R0, overrides: { uniform: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_uniform.png", outing: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_outing.png", daily: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_daily.png", nsfw: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_nsfw.png", vulva_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_vulva_selfie.png" } },
      bai_xiaoxue: { sfwBase: R0, nsfwBase: R0, overrides: { uniform: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_uniform.png", outing: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_outing.png", daily: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_daily.png", nsfw: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_nsfw.png", anal: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_anal.png", anal_training: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_anal_training.png", blowjob: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_blowjob.png", exhibition: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_exhibition.png", footjob: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_footjob.png", holding_pee: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_holding_pee.png", indoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_indoor_selfie.png", nude_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_nude_selfie.png", orgasm: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_orgasm.png", outdoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_outdoor_selfie.png", sex: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_sex.png", training: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_training.png" } },
      lin_wenxia: { sfwBase: R32, nsfwBase: R32, overrides: { holding_pee: GH+"vmkudz-sys/my-image-bed/main/lin_wenxia_holding.png" } },
      xu_yuanji: { sfwBase: R2, nsfwBase: R2, overrides: {} },
      xu_yuan: { sfwBase: R2, nsfwBase: R2, overrides: {} },
      anlin: { sfwBase: R23, nsfwBase: R23, overrides: {} },
      shujing: { sfwBase: R39, nsfwBase: R39, overrides: {} },
      lanxin: { sfwBase: R14, nsfwBase: R14, overrides: {} },
      sunqi: { sfwBase: R4, nsfwBase: R4, overrides: {} },
      zhu_yue: { sfwBase: R29, nsfwBase: R29, overrides: { outdoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_nude_selfie.png", indoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_outdoor_selfie.png", nude_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_vulva_selfie.png", exhibition: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_exhibition.png" } },
      zhao_shiqing: { sfwBase: R25, nsfwBase: R25, overrides: {} },
      zhu_juexiang: { sfwBase: R38, nsfwBase: R38, overrides: { outing: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_outgoing.png", outdoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_nude_selfie.png", indoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_outdoor_selfie.png", nude_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_selfie.png" } },
      pei_shuquan: { sfwBase: R35, nsfwBase: R35, overrides: {} },
      zhi_yun: { sfwBase: R44, nsfwBase: R44, overrides: { daily: R44 + "/zhi_yun_outing.png", outing: R44 + "/zhi_yun_daily.png", uniform: R44 + "/zhi_yun_uniform.png", nsfw: R44 + "/zhi_yun_nsfw.png" } },
      tang_mi: { sfwBase: GH+"HaoX520/-/refs/heads/main/tang_mi", nsfwBase: GH+"HaoX520/-/refs/heads/main/tang_mi", overrides: { exhibition: GH+"HaoX520/-/refs/heads/main/tang_mi/tang_mi__exhibition.png", vulva_selfie: GH+"HaoX520/-/refs/heads/main/tang_mi/tang_mi_vulva_selfie.png" } },
      yang_can: { sfwBase: GH+"yiliya443290-a11y/-/main", nsfwBase: GH+"yiliya443290-a11y/-/main", overrides: {} }
    };

    const charactersData = [
      { id: "sun_yitong", name: "孙翌童", preset: "modern", sfwBase: R17, nsfwBase: GH+"xm212617-code/-/a9830d2826c33925dedef30590d0c6709c3d8021", overrides: { uniform: GH+"xm212617-code/-/428e7699609ca4d1ee954aac585276141cedc0e8/sun_yitong_uniform.png" } },
      { id: "zhang_ziwei", name: "张子薇", preset: "modern", sfwBase: R17, nsfwBase: GH+"xm212617-code/-/40df97071b5f9e5f52bc0aab107efc6610c9d8bf", overrides: {} },
      { id: "liu_qing", name: "柳青", preset: "modern", sfwBase: R17, nsfwBase: GH+"xm212617-code/-/a9830d2826c33925dedef30590d0c6709c3d8021", overrides: {} },
      { id: "li_nanxing", name: "李南星", preset: "modern", sfwBase: R17, nsfwBase: GH+"xm212617-code/-/ad797fdb8dfc35619f4b922ad7f25d06d56b2530", overrides: {} },
      { id: "jin_jingjing", name: "金晶晶", preset: "modern", sfwBase: GH+"xm212617-code/-/cb33b9d2f9eaea67d40e008de2e84ea9ccfb9dd9", nsfwBase: GH+"xm212617-code/-/64f18bf75073d8736c56dff50291da709c0b5e25", overrides: {} },
      { id: "tang_jialin", name: "汤加琳", preset: "modern", sfwBase: GH+"xm212617-code/-/bab371f966c4a1ad10aeee4c285f4382d3d93863", nsfwBase: GH+"xm212617-code/-/bab371f966c4a1ad10aeee4c285f4382d3d93863", overrides: {} },
      { id: "hu_jing", name: "胡静", preset: "modern", sfwBase: GH+"xm212617-code/-/533f66d0d1f93768dfcd5fe7aa8621602b8f7f85", nsfwBase: GH+"xm212617-code/-/533f66d0d1f93768dfcd5fe7aa8621602b8f7f85", overrides: {} },
      { id: "lan_ye", name: "兰叶", preset: "modern", sfwBase: GH+"xm212617-code/-/56dac2f4159c16748445600c5a5b4e9147c074a7", nsfwBase: GH+"xm212617-code/-/56dac2f4159c16748445600c5a5b4e9147c074a7", overrides: { nsfw: GH+"xm212617-code/-/56dac2f4159c16748445600c5a5b4e9147c074a7/lan_ye_nude.png" } },
      { id: "huang_shuyi", name: "黄淑仪", preset: "modern", sfwBase: GH+"xm212617-code/-/434db2d525c8312e1b6f83dfc001b30a11ed0ede", nsfwBase: GH+"xm212617-code/-/434db2d525c8312e1b6f83dfc001b30a11ed0ede", overrides: {} },
      { id: "chen_xiaobei", name: "陈晓北", preset: "modern", sfwBase: GH+"xm212617-code/-/e50bef3dca86eede99229a3d4393c0a8200a15da", nsfwBase: GH+"xm212617-code/-/e50bef3dca86eede99229a3d4393c0a8200a15da", overrides: { training: GH+"xm212617-code/-/4b39e28b3f2ad5cf3460222d80da4fdb269b830f/chen_xiaobei_training.png" } },
      { id: "luo_jia", name: "珞珈", preset: "modern", sfwBase: GH+"xm212617-code/-/906a985b1bb327fea740a6576809e276c65ebc96", nsfwBase: GH+"xm212617-code/-/906a985b1bb327fea740a6576809e276c65ebc96", overrides: {} },
      { id: "luo_hua", name: "珞花", preset: "modern", sfwBase: R28, nsfwBase: R28, overrides: {} },
      { id: "yang_can", name: "阳灿", preset: "modern", sfwBase: R34, nsfwBase: R34, overrides: {} },
      { id: "zhao_yaqin", name: "赵雅琴", preset: "modern", sfwBase: GH+"xm212617-code/-/2701373f7349c16114efacca1ef972fd100db404", nsfwBase: GH+"xm212617-code/-/2701373f7349c16114efacca1ef972fd100db404", overrides: {} },
      { id: "wen_su", name: "文素", preset: "modern", sfwBase: GH+"xm212617-code/-/9a70bb527c32f8fb3f195e5924c411794b947128", nsfwBase: GH+"xm212617-code/-/9a70bb527c32f8fb3f195e5924c411794b947128", overrides: {} },
      { id: "rang_na", name: "让娜", preset: "modern", sfwBase: GH+"xm212617-code/-/405b9c6a2363e8ec841c5950f3a99323851642b4", nsfwBase: GH+"xm212617-code/-/405b9c6a2363e8ec841c5950f3a99323851642b4", overrides: {} },
      { id: "pang_yongxuan", name: "庞咏萱", preset: "modern", sfwBase: GH+"xm212617-code/-/312181e0d272d99602c5115426befc1c98871dac", nsfwBase: GH+"xm212617-code/-/312181e0d272d99602c5115426befc1c98871dac", overrides: {} },
      { id: "zhu_peiling", name: "祝佩玲", preset: "modern", sfwBase: R36, nsfwBase: R36, overrides: {} },
      { id: "lin_anan", name: "林安安", preset: "modern", sfwBase: R5, nsfwBase: R5, overrides: {} },
      { id: "wu_haiwen", name: "吴海文", preset: "modern", sfwBase: R16, nsfwBase: R16, overrides: {} },
      { id: "sun_ruixi", name: "孙瑞希", preset: "modern", sfwBase: R7, nsfwBase: R7, overrides: { exhibition: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_exposure.png", outdoor_selfie: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_outdoor_exposure_selfie.png", indoor_selfie: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_indoor_exposure_selfie.png" } },
      { id: "zhu_yegu", name: "祝叶谷", preset: "modern", sfwBase: R37, nsfwBase: R37, overrides: {} },
      { id: "lun_xintong", name: "伦欣桐", preset: "modern", sfwBase: R18, nsfwBase: R18, overrides: {} },
      { id: "wen_xin", name: "文馨", preset: "modern", sfwBase: R20, nsfwBase: R20, overrides: {} },
      { id: "wen_lan", name: "文澜", preset: "modern", sfwBase: R6, nsfwBase: R6, overrides: {} },
      { id: "hong_xintong", name: "洪欣彤", preset: "modern", sfwBase: R31, nsfwBase: R31, overrides: {} },
      { id: "he_ling", name: "贺玲", preset: "modern", sfwBase: R8, nsfwBase: R8, overrides: {} },
      { id: "pang_ying", name: "庞颖", preset: "traveler", sfwBase: R26, nsfwBase: R26, overrides: {} },
      { id: "dugu_chuner", name: "独孤春儿", preset: "traveler", sfwBase: R13, nsfwBase: R13, overrides: {} },
      { id: "han_zhenzhen", name: "韩真真", preset: "traveler", sfwBase: R33, nsfwBase: R33, overrides: {} },
      { id: "zhu_qing", name: "朱清", preset: "traveler", sfwBase: R10, nsfwBase: R10, overrides: {} },
      { id: "zhang_weiwei", name: "张薇薇", preset: "traveler", sfwBase: R24, nsfwBase: R24, overrides: {} },
      { id: "tang_qian", name: "汤倩", preset: "traveler", sfwBase: R40, nsfwBase: R40, overrides: {} },
      { id: "ya_tao", name: "雅陶", preset: "traveler", sfwBase: R19, nsfwBase: R19, overrides: {} },
      { id: "ma_qingqing", name: "马青青", preset: "traveler", sfwBase: R12, nsfwBase: R12, overrides: {} },
      { id: "wen_yuan", name: "文鸢", preset: "traveler", sfwBase: R27, nsfwBase: R27, overrides: {} },
      { id: "dong_shiqing", name: "董世青", preset: "xiaoma", sfwBase: R3, nsfwBase: R3, overrides: {} },
      { id: "chen_yingying", name: "陈莹莹", preset: "xiaoma", sfwBase: R15, nsfwBase: R15, overrides: {} },
      { id: "lin_anan_xiaoma", name: "林安安（小马）", preset: "xiaoma", sfwBase: R1, nsfwBase: R1, overrides: {} },
      { id: "an_chunsheng", name: "安春生", preset: "xiaoma", sfwBase: R30, nsfwBase: R30, overrides: {} },
      { id: "nake", name: "那可", preset: "xiaoma", sfwBase: R22, nsfwBase: R22, overrides: {} },
      { id: "shaoyao", name: "芍药", preset: "xiaoma", sfwBase: R41, nsfwBase: R41, overrides: {} },
      { id: "suyu", name: "苏雨", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "chen_shuting", name: "陈书婷", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "ma_qi", name: "马琪", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "yuan_liping", name: "源丽萍", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "ming_xiangxiang", name: "明香香", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "ding_manhong", name: "丁曼红", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "wen_ruoning", name: "温若宁", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "fang_min", name: "方敏", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "lin_muyi", name: "林沐宜", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "zhao_xiaoman", name: "赵小满", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "zhao_ziyou", name: "赵自由", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: {} },
      { id: "jin_ning", name: "金宁", preset: "modern", sfwBase: GH+"duonglanoanh503-code/-/7d558a056af4cbe5d8d804d67505c80fc4bd88da", nsfwBase: GH+"duonglanoanh503-code/-/7d558a056af4cbe5d8d804d67505c80fc4bd88da", overrides: {} },
      { id: "wen_su_da", name: "文素（大）", preset: "modern", sfwBase: R1, nsfwBase: R1, overrides: {} },
      { id: "sun_yuanqing", name: "孙苑清", preset: "modern", sfwBase: GH+"duonglanoanh503-code/-/ca331f322201fe954018568f01494a5de324936d", nsfwBase: GH+"duonglanoanh503-code/-/ca331f322201fe954018568f01494a5de324936d", overrides: {} },
      { id: "hai_lin", name: "海霖", preset: "modern", sfwBase: GH+"duonglanoanh503-code/-/c5c8255226ee5f321b5251974333cdd3fac546fe", nsfwBase: GH+"duonglanoanh503-code/-/c5c8255226ee5f321b5251974333cdd3fac546fe", overrides: {} },
      { id: "zhou_ling", name: "周灵", preset: "modern", sfwBase: GH+"duonglanoanh503-code/-/3c76be53e4d7c74aa27241ea4c32d405270f06f9", nsfwBase: GH+"duonglanoanh503-code/-/3c76be53e4d7c74aa27241ea4c32d405270f06f9", overrides: {} },
      { id: "su_wantang", name: "苏晚棠", preset: "modern", sfwBase: R1, nsfwBase: R1, overrides: {} },
      { id: "yunyi", name: "云伊", preset: "modern", sfwBase: R11, nsfwBase: R11, overrides: {} },
      { id: "peihan", name: "沛涵", preset: "modern", sfwBase: R21, nsfwBase: R21, overrides: {} },
      { id: "chen_si_yu", name: "陈思雨", preset: "modern", sfwBase: R1, nsfwBase: R1, overrides: { nsfw: GH+"roxysl521-droid/linanan_xiaoma/main/chen_si_yu_nsfw.png", indoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/chen_si_yu_outdoor_selfie.png", outdoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/chen_si_yu_indoor_selfie.png" } },
      { id: "su_zi_ning", name: "苏紫宁", preset: "modern", sfwBase: R1, nsfwBase: R1, overrides: { indoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/su_zi_ning_outdoor_selfie.png", outdoor_selfie: GH+"roxysl521-droid/linanan_xiaoma/main/su_zi_ning_indoor_selfie.png" } },
      { id: "shen_yang", name: "沈漾", preset: "modern", sfwBase: R9, nsfwBase: R9, overrides: { daily: R43, uniform: R42, outing: GH+"AliceNekoqqq/Pic/master/img/4.png", nsfw: GH+"AliceNekoqqq/Pic/master/img/3.png", blowjob: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E5%8F%A3%E4%BA%A4.png", footjob: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E8%B6%B3%E4%BA%A4.png", holding_pee: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%86%8B%E5%B0%BF.png", sex: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%80%A7%E4%BA%A4.png", anal: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E8%82%9B%E4%BA%A4.png", orgasm: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E9%AB%98%E6%BD%AE.png", anal_training: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E8%82%9B%E9%97%A8%E8%B0%83%E6%95%99.png", training: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E8%B0%83%E6%95%99.png", exhibition: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E9%9C%B2%E5%87%BA.png", vulva_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E9%98%B4%E9%83%A8%E8%87%AA%E6%8B%8D.png", nude_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E5%85%A8%E8%A3%B8%E8%87%AA%E6%8B%8D.png", outdoor_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%88%B7%E5%A4%96%E9%9C%B2%E5%87%BA%E8%87%AA%E6%8B%8D.png", indoor_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E5%AE%A4%E5%86%85%E9%9C%B2%E5%87%BA%E8%87%AA%E6%8B%8D.png" } },
      { id: "rong_rourou", name: "荣柔柔", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: { holding_pee: GH+"zhamuqiu/tongren2/refs/heads/main/rong_rourou_exhibition.png", exhibition: GH+"zhamuqiu/tongren2/refs/heads/main/rong_rourou_exhibtion.png", outdoor_selfie: "" } },
      { id: "xu_mingwei", name: "许明薇", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: { holding_pee: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_hoding_pee.png", nude_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_vulva_selfie.png", indoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_outdoor_selfie.png", outdoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/xu_mingwei_nude_selfie.png" } },
      { id: "liu_yuan", name: "刘予安", preset: "modern", sfwBase: R0, nsfwBase: R0, overrides: { nude_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/liu_yuan_vulva_selfie.png", indoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/liu_yuan_outdoor_selfie.png", outdoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/liu_yuan_nude_selfie.png" } },
      { id: "han_bingjiao", name: "韩冰娇", preset: "modern", sfwBase: GH+"xuanyuy2019-ops/Image/main/han/sfw", nsfwBase: GH+"xuanyuy2019-ops/Image/main/han/nsfw", overrides: { indoor_selfie: GH+"xuanyuy2019-ops/Image/main/han/nsfw/han_bingjiao_vulva_selfie.png" } },
      { id: "guo_yuyao", name: "郭雨瑶", sfwBase: GH+"Alunamin/xiancheng/main/guo_yuyao", nsfwBase: GH+"Alunamin/xiancheng/main/guo_yuyao", overrides: { indoor_selfie: GH+"Alunamin/xiancheng/main/guo_yuyao/guo_yuyao_vulva_selfie.png" } },
      { id: "liu_qiyin", name: "刘祈音", sfwBase: GH+"Alunamin/xiancheng/main/liu_qiyin", nsfwBase: GH+"Alunamin/xiancheng/main/liu_qiyin", overrides: { nude_selfie: GH+"Alunamin/xiancheng/main/liu_qiyin/liu_qiyin_vulva_selfie.png", indoor_selfie: GH+"Alunamin/xiancheng/main/liu_qiyin/liu_qiyin_outdoor_selfie.png", outdoor_selfie: GH+"Alunamin/xiancheng/main/liu_qiyin/liu_qiyin_nude_selfie.png" } },
      { id: "zhou_yutong", name: "周语彤", sfwBase: R0, nsfwBase: R0, overrides: { vulva_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_vulva_selfie.png" } },
      { id: "bai_xiaoxue", name: "白晓雪", sfwBase: R0, nsfwBase: R0, overrides: { uniform: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_uniform.png", outing: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_outing.png", daily: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_daily.png", nsfw: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_nsfw.png", anal: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_anal.png", anal_training: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_anal_training.png", blowjob: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_blowjob.png", exhibition: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_exhibition.png", footjob: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_footjob.png", holding_pee: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_holding_pee.png", indoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_indoor_selfie.png", nude_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_nude_selfie.png", orgasm: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_orgasm.png", outdoor_selfie: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_outdoor_selfie.png", sex: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_sex.png", training: GH+"zhamuqiu/tongren2/refs/heads/main/bai_xiaoxue_training.png" } },
      { id: "lin_wenxia", name: "林闻夏", preset: "modern", sfwBase: R32, nsfwBase: R32, overrides: { holding_pee: GH+"vmkudz-sys/my-image-bed/main/lin_wenxia_holding.png" } },
      { id: "xu_yuanji", name: "许愿姬", preset: "modern", sfwBase: R2, nsfwBase: R2, overrides: {} },
      { id: "xu_yuan", name: "许愿", preset: "modern", sfwBase: R2, nsfwBase: R2, overrides: {} },
      { id: "anlin", name: "安琳", preset: "modern", sfwBase: R23, nsfwBase: R23, overrides: {} },
      { id: "shujing", name: "淑静", preset: "modern", sfwBase: R39, nsfwBase: R39, overrides: {} },
      { id: "lanxin", name: "兰心", preset: "modern", sfwBase: R14, nsfwBase: R14, overrides: {} },
      { id: "sunqi", name: "孙琦", preset: "modern", sfwBase: R4, nsfwBase: R4, overrides: {} },
      { id: "zhu_yue", name: "朱玥", preset: "modern", sfwBase: R29, nsfwBase: R29, overrides: { outing: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_outgoing.png", outdoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_nude_selfie.png", indoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_outdoor_selfie.png", nude_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_vulva_selfie.png", exhibition: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_exhibition.png" } },
      { id: "zhao_shiqing", name: "赵诗晴", preset: "modern", sfwBase: R25, nsfwBase: R25, overrides: {} },
      { id: "zhu_juexiang", name: "祝绝响", preset: "modern", sfwBase: R38, nsfwBase: R38, overrides: { outing: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_outgoing.png", outdoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_nude_selfie.png", indoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_outdoor_selfie.png", nude_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_selfie.png" } },
      { id: "pei_shuquan", name: "裴姝权", preset: "modern", sfwBase: R35, nsfwBase: R35, overrides: {} },
      { id: "zhi_yun", name: "智允", preset: "modern", sfwBase: R44, nsfwBase: R44, overrides: { daily: R44 + "/zhi_yun_outing.png", outing: R44 + "/zhi_yun_daily.png", uniform: R44 + "/zhi_yun_uniform.png", nsfw: R44 + "/zhi_yun_nsfw.png" } },
      { id: "luo_ke_ke", name: "罗可可", preset: "modern", sfwBase: R45, nsfwBase: R45, overrides: { daily: R45 + "/luo_ke_ke_outing.png", outing: R45 + "/luo_ke_ke_daily.png", uniform: R45 + "/luo_ke_ke_uniform.png", nsfw: R45 + "/luo_ke_ke_nsfw.png" } },
      { id: "lin_yue", name: "林悦", preset: "modern", sfwBase: "https://raw.githubusercontent.com/ningj8622-coder/-1/1b8b808c9bbfc79ba68476dfd4342312d15dbc5d", nsfwBase: "https://raw.githubusercontent.com/ningj8622-coder/-1/1b8b808c9bbfc79ba68476dfd4342312d15dbc5d", overrides: { uniform: "https://raw.githubusercontent.com/ningj8622-coder/-1/1b8b808c9bbfc79ba68476dfd4342312d15dbc5d/lin_yue_uniform.png", outing: "https://raw.githubusercontent.com/ningj8622-coder/-1/1b8b808c9bbfc79ba68476dfd4342312d15dbc5d/lin_yue_outing.png", daily: "https://raw.githubusercontent.com/ningj8622-coder/-1/1b8b808c9bbfc79ba68476dfd4342312d15dbc5d/lin_yue_daily.png", nsfw: "https://raw.githubusercontent.com/ningj8622-coder/-1/1b8b808c9bbfc79ba68476dfd4342312d15dbc5d/lin_yue_nsfw.png" } },
      { id: "tang_mi", name: "唐蜜", preset: "modern", sfwBase: GH+"HaoX520/-/refs/heads/main/tang_mi", nsfwBase: GH+"HaoX520/-/refs/heads/main/tang_mi", overrides: { exhibition: GH+"HaoX520/-/refs/heads/main/tang_mi/tang_mi__exhibition.png", vulva_selfie: GH+"HaoX520/-/refs/heads/main/tang_mi/tang_mi_vulva_selfie.png" } }
    ];

    const fallbackAvatars = {
      sun_yitong: "S", zhang_ziwei: "Z", liu_qing: "L", li_nanxing: "L",
      jin_jingjing: "J", tang_jialin: "T", hu_jing: "H", lan_ye: "L",
      huang_shuyi: "H", chen_xiaobei: "C", luo_jia: "L", luo_hua: "珞",
      yang_can: "阳", zhao_yaqin: "Z", wen_su: "W", rang_na: "R",
      pang_yongxuan: "P", zhu_peiling: "Z", lin_anan: "L", wu_haiwen: "W",
      sun_ruixi: "S", zhu_yegu: "Z", lun_xintong: "L", wen_xin: "W",
      wen_lan: "W", hong_xintong: "H", he_ling: "H", suyu: "S",
      chen_shuting: "C", ma_qi: "M", yuan_liping: "Y", ming_xiangxiang: "M",
      ding_manhong: "丁", wen_ruoning: "W", fang_min: "方", lin_muyi: "林",
      zhao_xiaoman: "赵", zhao_ziyou: "赵", pang_ying: "庞", dugu_chuner: "独",
      han_zhenzhen: "韩", zhu_qing: "朱", zhang_weiwei: "张", tang_qian: "汤",
      ya_tao: "雅", ma_qingqing: "马", wen_yuan: "文", dong_shiqing: "董",
      chen_yingying: "陈", lin_anan_xiaoma: "林", an_chunsheng: "安",
      nake: "那", shaoyao: "芍", jin_ning: "金", wen_su_da: "文",
      sun_yuanqing: "孙", hai_lin: "海", zhou_ling: "周", su_wantang: "S",
      yunyi: "云", peihan: "沛", zhou_yutong: "周", guo_yuyao: "G",
      liu_qiyin: "刘", bai_xiaoxue: "白", lin_wenxia: "林", xu_yuanji: "许",
      xu_yuan: "许", anlin: "安", shujing: "淑", lanxin: "兰",
      sunqi: "孙", zhu_yue: "朱", zhao_shiqing: "赵", zhu_juexiang: "祝",
      pei_shuquan: "裴", zhi_yun: "智", tang_mi: "唐", lin_yue: "林"
    };

    // --- 全局状态管理 ---
    let globalVersion = 0;
    let imageVersions = {};
    let currentIndex = 0;

    const mainAvatar = document.getElementById("main-avatar");
    const mainName = document.getElementById("main-name");
    const pagination = document.getElementById("pagination");
    const selectionView = document.getElementById("selection-view");
    const detailView = document.getElementById("detail-view");
    const galleryContainer = document.getElementById("gallery-container");
    const detailTitle = document.getElementById("detail-title");

    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxLink = document.getElementById("lightbox-link");

    function getImageUrl(charData, isSfw, variantKey) {
      if (!isSfw && variantKey === "vulva_selfie" && NO_VULVA_SELFIE_CHARS.includes(charData.id)) return "";
      if (!isSfw && ["vulva_selfie", "outdoor_selfie", "indoor_selfie", "nude_selfie"].includes(variantKey) && NO_SELFIE_CHARS.includes(charData.id)) return "";
      if (!isSfw && variantKey === "nude_selfie" && NO_NUDE_SELFIE_CHARS.includes(charData.id)) return "";
      const stateKey = `${charData.id}_${variantKey}`;
      const versionToUse =
        imageVersions[stateKey] !== undefined ? imageVersions[stateKey] : globalVersion;

      let base, overrides;

      if (versionToUse === 1 && VERSION2_CONFIG[charData.id]) {
        const v2 = VERSION2_CONFIG[charData.id];
        base = isSfw ? v2.sfwBase : v2.nsfwBase;
        overrides = v2.overrides;
      } else {
        base = isSfw ? charData.sfwBase : charData.nsfwBase;
        overrides = charData.overrides;
      }

      if (overrides && overrides[variantKey]) {
        return overrides[variantKey];
      }

      if (!base || base === "WAITING_FOR_IMAGE_HOST") return "";
      if (charData.id === "pei_shuquan" && variantKey === "uniform") {
        return `${base}/pei_shuquan_uniform${Math.random() > 0.5 ? "" : "2"}.png`;
      }
      return `${base}/${charData.id}_${variantKey}.png`;
    }

    function toggleGlobalVersion() {
      globalVersion = globalVersion === 0 ? 1 : 0;
      imageVersions = {};

      const btn = document.getElementById("global-switch-btn");
      btn.innerHTML = `🔄 当前：${globalVersion === 0 ? "版本一" : "版本二"}`;

      if (document.getElementById("detail-view").classList.contains("active")) {
        const char = charactersData[currentIndex];
        buildGallery(char);
      }
      updateCarousel();
      renderCharJumpList();
    }

    function toggleSingleImage(charId, variantKey, isSfw) {
      const stateKey = `${charId}_${variantKey}`;
      const currentV =
        imageVersions[stateKey] !== undefined ? imageVersions[stateKey] : globalVersion;
      imageVersions[stateKey] = currentV === 0 ? 1 : 0;

      const charData = charactersData.find((c) => c.id === charId);
      const newUrl = getImageUrl(charData, isSfw, variantKey);

      const imgEl = document.getElementById(`img-${charId}-${variantKey}`);
      if (imgEl) {
        const placeholder = imgEl.nextElementSibling;
        if (newUrl) {
          imgEl.src = newUrl;
          imgEl.style.display = "block";
          placeholder.style.display = "none";
        } else {
          imgEl.style.display = "none";
          placeholder.style.display = "block";
        }
      }
    }

    function init() {
      charactersData.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.onclick = () => {
          currentIndex = index;
          updateCarousel();
        };
        pagination.appendChild(dot);
      });

      updateCarousel();
      setupTouchSwipe();
      renderCharJumpList();
    }

    function updateCarousel() {
      const char = charactersData[currentIndex];

      let defaultSfwKey = "uniform";
      if (char.preset === "traveler" || char.preset === "xiaoma") {
        defaultSfwKey = "outing";
      }
      const url = getImageUrl(char, true, defaultSfwKey);

      mainAvatar.style.display = url ? "block" : "none";
      mainAvatar.nextElementSibling.style.display = url ? "none" : "block";
      mainAvatar.nextElementSibling.textContent = fallbackAvatars[char.id] || "?";
      if (url) mainAvatar.src = url;

      mainName.textContent = char.name;

      Array.from(pagination.children).forEach((dot, index) => {
        dot.className = index === currentIndex ? "dot active" : "dot";
      });
    }

    function prevChar() {
      currentIndex = (currentIndex - 1 + charactersData.length) % charactersData.length;
      updateCarousel();
    }

    function nextChar() {
      currentIndex = (currentIndex + 1) % charactersData.length;
      updateCarousel();
    }

    function setupTouchSwipe() {
      const el = document.getElementById("swipe-area");
      let touchStartX = 0;
      let touchEndX = 0;

      el.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      el.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
          nextChar();
        }
        if (touchEndX > touchStartX + threshold) {
          prevChar();
        }
      }
    }

    function openDetail() {
      const char = charactersData[currentIndex];
      detailTitle.textContent = `${char.name} 全套档案`;
      buildGallery(char);

      selectionView.classList.remove("active");
      detailView.classList.add("active");
      window.scrollTo(0, 0);
    }

    function closeDetail() {
      detailView.classList.remove("active");
      selectionView.classList.add("active");
    }

    /* ===== 角色速查弹窗逻辑 ===== */
    function openCharJumpModal() {
      renderCharJumpList();
      document.getElementById("char-search-input").value = "";
      document.getElementById("char-jump-modal").classList.add("active");
      document.body.style.overflow = "hidden";
      setTimeout(() => document.getElementById("char-search-input").focus(), 100);
    }

    function closeCharJumpModal(e) {
      document.getElementById("char-jump-modal").classList.remove("active");
      document.body.style.overflow = "";
    }

    function closeCharJumpModalDirect() {
      document.getElementById("char-jump-modal").classList.remove("active");
      document.body.style.overflow = "";
    }

    function renderCharJumpList(filterKeyword = "") {
      const container = document.getElementById("char-jump-list");
      container.innerHTML = "";

      const keyword = filterKeyword.trim().toLowerCase();
      const filtered = charactersData
        .map((char, index) => ({ char, index }))
        .filter((item) => {
          if (!keyword) return true;
          return (
            item.char.name.toLowerCase().includes(keyword) ||
            item.char.id.toLowerCase().includes(keyword)
          );
        });

      if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-secondary);">未找到匹配的角色</div>`;
        return;
      }

      filtered.forEach((item) => {
        const { char, index } = item;
        const presetInfo = VARIANT_PRESETS[char.preset || "modern"];
        let defaultSfwKey =
          char.preset === "traveler" || char.preset === "xiaoma" ? "outing" : "uniform";
        const avatarUrl = getImageUrl(char, true, defaultSfwKey);

        const div = document.createElement("div");
        div.className = "char-jump-item";
        div.onclick = () => {
          currentIndex = index;
          updateCarousel();
          openDetail();
          closeCharJumpModalDirect();
        };

        div.innerHTML = `
          <div class="char-jump-avatar">
            <img src="${avatarUrl}" alt="${char.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display:none; width:100%; height:100%; align-items:center; justify-content:center; background:#222; color:#fff; font-weight:bold; font-size:14px;">${fallbackAvatars[char.id] || "?"}</div>
          </div>
          <div class="char-jump-name-box">
            <div class="char-jump-name">${char.name}</div>
            <div class="char-jump-tag">${presetInfo.label} · ${char.id}</div>
          </div>
        `;
        container.appendChild(div);
      });
    }

    function filterCharJumpList() {
      const val = document.getElementById("char-search-input").value;
      renderCharJumpList(val);
    }

    /* ===== 全屏大图灯箱预览逻辑 ===== */
    function openLightbox(url, title, filename) {
      if (!url) return;
      lightboxImg.src = url;
      lightboxTitle.textContent = `${title} (${filename})`;
      lightboxLink.href = url;
      lightboxModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox(e) {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    function closeLightboxDirect() {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (lightboxModal.classList.contains("active")) {
          closeLightboxDirect();
        } else if (document.getElementById("char-jump-modal").classList.contains("active")) {
          closeCharJumpModalDirect();
        }
      }
    });

    /* ===== 画廊渲染逻辑 ===== */
    function buildGallery(char) {
      galleryContainer.innerHTML = "";

      const presetConfig = VARIANT_PRESETS[char.preset || "modern"];

      const sfwSection = document.createElement("div");
      sfwSection.innerHTML = `<div class="section-title">普通情境 (SFW)</div>`;
      const sfwGrid = document.createElement("div");
      sfwGrid.className = "grid";

      presetConfig.sfw.forEach((variant) => {
        sfwGrid.appendChild(
          createGridItem(
            variant.label,
            `${char.id}_${variant.key}.png`,
            char.id,
            true,
            variant.key,
            char.name
          )
        );
      });
      sfwSection.appendChild(sfwGrid);
      galleryContainer.appendChild(sfwSection);

      const nsfwSection = document.createElement("div");
      nsfwSection.innerHTML = `<div class="section-title">私密情境 (NSFW)</div>`;
      const nsfwGrid = document.createElement("div");
      nsfwGrid.className = "grid";

      presetConfig.nsfw.forEach((variant) => {
        if (variant.key === "vulva_selfie" && NO_VULVA_SELFIE_CHARS.includes(char.id)) {
          return;
        }
        if (
          ["vulva_selfie", "outdoor_selfie", "indoor_selfie", "nude_selfie"].includes(variant.key) &&
          NO_SELFIE_CHARS.includes(char.id)
        ) {
          return;
        }
        if (variant.key === "nude_selfie" && NO_NUDE_SELFIE_CHARS.includes(char.id)) {
          return;
        }
        nsfwGrid.appendChild(
          createGridItem(
            variant.label,
            `${char.id}_${variant.key}.png`,
            char.id,
            false,
            variant.key,
            char.name
          )
        );
      });
      nsfwSection.appendChild(nsfwGrid);
      galleryContainer.appendChild(nsfwSection);
    }

    function createGridItem(tag, filename, charId, isSfw, variantKey, charName) {
      const div = document.createElement("div");
      div.className = "grid-item";

      const charData = charactersData.find((c) => c.id === charId);
      const imgSrc = getImageUrl(charData, isSfw, variantKey);

      // 实时动态读取最新翻转后的图片链接，彻底解决大图预览与翻转版本不一致问题
      div.onclick = () => {
        const currentCharData = charactersData.find((c) => c.id === charId);
        const currentImgSrc = getImageUrl(currentCharData, isSfw, variantKey);
        openLightbox(currentImgSrc, `${charName} · ${tag}`, filename);
      };

      div.innerHTML = `
        <div class="grid-thumb">
          <button class="single-switch-btn" title="单独切换该立绘版本" onclick="event.stopPropagation(); toggleSingleImage('${charId}', '${variantKey}', ${isSfw})">🔄</button>
          <img id="img-${charId}-${variantKey}" src="${imgSrc}" alt="${tag}" loading="lazy" style="${imgSrc ? 'display:block;' : 'display:none;'}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <div class="placeholder-text" style="${imgSrc ? "display:none;" : "display:block;"}">${fallbackAvatars[charId] || "?"}</div>
        </div>
        <div class="grid-info">
          <div class="grid-tag">${tag}</div>
          <div class="grid-filename">${filename}</div>
        </div>
      `;
      return div;
    }

    init();
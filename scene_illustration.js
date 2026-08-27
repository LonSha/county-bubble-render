const GH="https://raw.githubusercontent.com/";
const R0=GH+"zhamuqiu/tongren2/refs/heads/main";
const R1=GH+"LonSha/xiancheng/main";
const R2=GH+"roxysl521-droid/linanan_xiaoma/main";
const R3=GH+"xm212617-code/-/e618684d9d3ec0f61098e77caa94790280172fce";
const R4=GH+"vmkudz-sys/my-image-bed/main/lin_jia_daily.png";

        (function () {
          const scripts = document.getElementsByTagName("script");
          const currentScript = scripts[scripts.length - 1];
          const wrapper = currentScript.parentElement;

          const metaContainer = wrapper.querySelector(".scene-meta-container");
          const charContainer = wrapper.querySelector(".character-container");
          const collapseBtn = wrapper.querySelector(".collapse-btn");
          const collapseIcon = wrapper.querySelector(".collapse-icon");
          const collapseText = wrapper.querySelector(".collapse-text");
          const switchVersionBtn = wrapper.querySelector(".switch-version-btn");
          const versionText = wrapper.querySelector(".version-text");

          let isGloballyFlipped = false;

          const sceneText = document.getElementById("scene-data-raw").textContent;

          const CHAR_COLOR_MAP={'丁曼红':'#a06080','云伊':'#b0d0f0','伦欣桐':'#50c878','兰叶':'#c87060','兰心':'#c8b0d0','刘予安':'#f47070','刘恩泽':'#c8a0c0','刘祈音':'#e8855a','刘福堂':'#8a7a6a','吴海文':'#70c0a0','周灵':'#8898b0','周语彤':'#d63384','唐蜜':'#f0a050','夏祈':'#9eb8c8','孙琦':'#7eb8a0','孙瑞希':'#e870a0','孙翌童':'#f4a847','孙苑清':'#b0b8c8','安春生':'#e8a890','安琳':'#e8a0a8','庞咏萱':'#f490a8','庞颖':'#c8a080','张子薇':'#ff6b6b','张薇薇':'#e0c0a0','文澜':'#b8c4e8','文素':'#d0b890','文茜':'#c8b8a0','文馨':'#e0e0ff','文鸢':'#f48060','方敏':'#f4b8a0','明香香':'#ff6b35','智允':'#d0c0b0','朱城':'#9a8a7a','罗可可':'#f0a0c0','朱清':'#c06080','朱玥':'#88c8a8','李南星':'#f0b232','杨小雪':'#c8d8e8','林听晚':'#a0b8d8','林墨':'#98b8a0','林安安':'#ff9ecd','林沐宜':'#a0c0a8','林葭':'#80a890','林见夏':'#e87060','林野':'#88a080','林闻夏':'#b0a8c0','柳青':'#f47b67','江静屿':'#7090c0','汤倩':'#a8a0c0','汤加琳':'#ffb86c','沈幼楚':'#a8c8e8','沈漾':'#a8d0e0','沈静宜':'#8a9db0','沛涵':'#d0a8b8','洪欣彤':'#ff80c0','海霖':'#80a0a8','淑静':'#b8b8a0','温若宁':'#c8b8d8','源丽萍':'#d09050','独孤春儿':'#e8f0a0','珞曼':'#a08090','珞珈':'#f0d090','珞花':'#c87ea0','白晓雪':'#e8e0d0','祝佩玲':'#b07860','祝叶谷':'#c89860','祝绝响':'#c8a090','胡静':'#c4956a','芍药':'#a8a890','苏晚棠':'#e8a0c0','苏紫宁':'#b88cf0','苏雨':'#6ab0a8','荣柔柔':'#e8b8d0','萧容鱼':'#d4a0a0','董世青':'#8a6a5a','裴姝权':'#c898d8','让娜':'#e8e0c0','让娜·库兹涅佐娃':'#e8e0c0','许愿':'#e8c878','许愿/许愿姬':'#e8c878','许愿姬':'#e8c878','许明薇':'#a89080','贺玲':'#f47860','赵小满':'#f0c080','赵自由':'#688090','赵诗晴':'#d8a080','赵雅琴':'#d0a060','那可':'#9888a0','郭雨瑶':'#a8c0e8','金宁':'#c8a050','金晶晶':'#ff9a76','阳灿':'#f4a090','陈书婷':'#8a8090','陈思雨':'#5ec8a8','陈晓北':'#a8d8a8','陈莹莹':'#d8a8c8','雅陶':'#a89070','韦青青':'#7eb050','韩冰娇':'#7eb8da','韩真真':'#d07070','马琪':'#a070a0','马青青':'#f0c060','魏莱':'#c0c0e0','陈浩':'#c0a870','黄淑仪':'#e8a87c','黎昭':'#90b8d0','林悦':'#f0a8c8'};
          const fallbackAvatars = {
            云伊: "Y",沛涵: "P",孙翌童: "S",张子薇: "Z",柳青: "L",李南星: "N",
            金晶晶: "J",汤加琳: "T",胡静: "H",兰叶: "Y",黄淑仪: "S",陈晓北: "X",
            珞珈: "L",珞花: "L","『珞珈』": "L",赵雅琴: "Z",文素: "W",让娜: "R",
            庞咏萱: "P",祝佩玲: "Z",林安安: "L",吴海文: "W",孙瑞希: "S",祝叶谷: "Z",
            伦欣桐: "L",文馨: "W",文澜: "W",洪欣彤: "H",贺玲: "H",苏雨: "苏",
            陈书婷: "陈",马琪: "M",源丽萍: "Y",明香香: "M",温若宁: "W",周灵: "周",
            庞颖: "庞",独孤春儿: "独",韩真真: "韩",朱清: "朱",张薇薇: "张",汤倩: "汤",
            雅陶: "雅",马青青: "马",文鸢: "鸢",董世青: "董",陈莹莹: "陈",
            "林安安（小马）": "林",安春生: "安",那可: "那",芍药: "芍",金宁: "金",
            "文素（大）": "文",孙苑清: "孙",海霖: "H",赵小满: "赵",赵自由: "赵",
            林沐宜: "林",丁曼红: "丁",方敏: "方",陈思雨: "C",苏紫宁: "S",沈漾: "S",
            许明薇: "X",刘予安: "L",荣柔柔: "R",韩冰娇: "H",郭雨瑶: "G",刘祈音: "刘",
            苏晚棠: "S",周语彤: "周",白晓雪: "白",朱玥: "玥",祝绝响: "祝",
            林闻夏: "林",林葭: "林",许愿姬: "许",许愿: "许",林墨: "林",阳灿: "阳",
            安琳: "安",淑静: "淑",兰心: "兰",孙琦: "孙",赵诗晴: "赵",韦青青: "韦",
            萧容鱼: "萧",魏莱: "魏",沈幼楚: "楚",沈静宜: "沈",文茜: "文",珞曼: "珞",
            唐蜜: "唐",夏祈: "夏",杨小雪: "杨",裴姝权: "裴",智允: "智",江静屿: "江",罗可可: "罗",
            黎昭: "黎",
            林悦: "林"
          };

          const nameToIdMap = {
            云伊: "yunyi",沛涵: "peihan",孙翌童: "sun_yitong",张子薇: "zhang_ziwei",
            柳青: "liu_qing",李南星: "li_nanxing",陈思雨: "chen_si_yu",苏紫宁: "su_zi_ning",
            沈漾: "shen_yang",许明薇: "xu_mingwei",刘予安: "liu_yuan",荣柔柔: "rong_rourou",
            韩冰娇: "han_bingjiao",刘祈音: "liu_qiyin",郭雨瑶: "guo_yuyao",金晶晶: "jin_jingjing",
            汤加琳: "tang_jialin",胡静: "hu_jing",兰叶: "lan_ye",黄淑仪: "huang_shuyi",
            陈晓北: "chen_xiaobei",珞珈: "luo_jia",珞花: "luo_hua","『珞珈』": "luo_hua",
            赵雅琴: "zhao_yaqin",文素: "wen_su",让娜: "rang_na",庞咏萱: "pang_yongxuan",
            祝佩玲: "zhu_peiling",林安安: "lin_anan",吴海文: "wu_haiwen",孙瑞希: "sun_ruixi",
            祝叶谷: "zhu_yegu",伦欣桐: "lun_xintong",文馨: "wen_xin",文澜: "wen_lan",
            洪欣彤: "hong_xintong",贺玲: "he_ling",苏雨: "suyu",陈书婷: "chen_shuting",
            马琪: "ma_qi",源丽萍: "yuan_liping",明香香: "ming_xiangxiang",丁曼红: "ding_manhong",
            温若宁: "wen_ruoning",周灵: "zhou_ling",庞颖: "pang_ying",独孤春儿: "dugu_chuner",
            韩真真: "han_zhenzhen",朱清: "zhu_qing",张薇薇: "zhang_weiwei",汤倩: "tang_qian",
            雅陶: "ya_tao",马青青: "ma_qingqing",文鸢: "wen_yuan",董世青: "dong_shiqing",
            陈莹莹: "chen_yingying","林安安（小马）": "lin_anan_xiaoma",安春生: "an_chunsheng",
            那可: "nake",芍药: "shaoyao",金宁: "jin_ning","文素（大）": "wen_su_da",
            孙苑清: "sun_yuanqing",海霖: "hai_lin",赵小满: "zhao_xiaoman",赵自由: "zhao_ziyou",
            林沐宜: "lin_muyi",方敏: "fang_min",苏晚棠: "su_wantang",周语彤: "zhou_yutong",
            白晓雪: "bai_xiaoxue",朱玥: "zhu_yue",祝绝响: "zhu_juexiang",林闻夏: "wen_xia",
            林葭: "lin_jia",许愿姬: "xu_yuanji",许愿: "xu_yuan",林墨: "lin_mo",阳灿: "yang_can",
            安琳: "anlin",淑静: "shujing",兰心: "lanxin",孙琦: "sunqi",赵诗晴: "zhao_shiqing",
            韦青青: "weiqingqing",萧容鱼: "xiao_rongyu",魏莱: "wei_lai",沈幼楚: "shen_youchu",
            沈静宜: "shen_jingyi",文茜: "wen_qian",珞曼: "luo_man",唐蜜: "tang_mi",
            夏祈: "xia_qi",杨小雪: "yang_xiaoxue",裴姝权: "pei_shuquan",智允: "zhi_yun",
            江静屿: "jiang_jingyu",罗可可: "luo_ke_ke",黎昭: "li_zhao"
          };

          const canonicalNames = Object.keys(nameToIdMap);
          const variantAliases = {
            制服: "uniform",外出: "outing",日常: "daily",居家: "daily",赤裸: "nsfw",内衣: "underwear"
          };

          const baseV1 = {
            sun_yitong: R3,zhang_ziwei: R3,liu_qing: R3,li_nanxing: R3,
            jin_jingjing: GH+"xm212617-code/-/cb33b9d2f9eaea67d40e008de2e84ea9ccfb9dd9",
            tang_jialin: GH+"xm212617-code/-/bab371f966c4a1ad10aeee4c285f4382d3d93863",
            hu_jing: GH+"xm212617-code/-/533f66d0d1f93768dfcd5fe7aa8621602b8f7f85",
            lan_ye: GH+"xm212617-code/-/56dac2f4159c16748445600c5a5b4e9147c074a7",
            huang_shuyi: GH+"xm212617-code/-/434db2d525c8312e1b6f83dfc001b30a11ed0ede",
            chen_xiaobei: GH+"xm212617-code/-/e50bef3dca86eede99229a3d4393c0a8200a15da",
            luo_jia: GH+"xm212617-code/-/906a985b1bb327fea740a6576809e276c65ebc96",
            zhao_yaqin: GH+"xm212617-code/-/2701373f7349c16114efacca1ef972fd100db404",
            wen_su: GH+"xm212617-code/-/9a70bb527c32f8fb3f195e5924c411794b947128",
            rang_na: GH+"xm212617-code/-/405b9c6a2363e8ec841c5950f3a99323851642b4",
            pang_yongxuan: GH+"xm212617-code/-/312181e0d272d99602c5115426befc1c98871dac"
          };

          const baseV2 = {
            sun_yitong: GH+"ningj8622-coder/-1/56e321c094ebeae18125450ecb7c91c64e1c75e5",
            zhang_ziwei: GH+"ningj8622-coder/-1/61b4b92a7c0ddd361fdcfa174fc1e97a398c6bd7",
            liu_qing: GH+"ningj8622-coder/-1/03829b288b27ce3f46753b7eb325dc3031c7999c",
            li_nanxing: GH+"ningj8622-coder/-1/19f1a4a98e8976e441133de769dda730670a6b7c",
            jin_jingjing: GH+"ningj8622-coder/-1/e6f825ab04b087e070a9f07f93cb73bb6fa14286",
            tang_jialin: GH+"ningj8622-coder/-1/3629590f981d36cc68e3d1696349dd1de13b32b5",
            hu_jing: GH+"ningj8622-coder/-1/1de1c22e45edb7830cd909de7cfbcb1877f13cea",
            lan_ye: GH+"ningj8622-coder/-1/68e7f30618d184cc66949de0fa68b45b83c49c5f",
            huang_shuyi: GH+"ningj8622-coder/-1/c9fe2a07a5e423f6624e97124dd0c74235440a93",
            chen_xiaobei: GH+"ningj8622-coder/-1/eee6f3d0f905b743625293d4f56090311c667003",
            luo_jia: GH+"ningj8622-coder/-1/60ed3af6fbe22efcae102489306d9fab8e108863",
            zhao_yaqin: GH+"ningj8622-coder/-1/f7773d9105f8fbf6254406315ab0a65fa3900cd3",
            wen_su: GH+"ningj8622-coder/-1/082b654b3c6653ee32314e0343bf5d0dc0429a3d",
            rang_na: GH+"ningj8622-coder/-1/32eb10d95e136df704d167d01bf1f7038fcf7e5a",
            pang_yongxuan: GH+"ningj8622-coder/-1/c749b592ebaf6044127cd98fe8051639362a2040"
          };

          const baseCommon = {
            zhou_yutong: R0,bai_xiaoxue: R0,
            han_bingjiao: GH+"xuanyuy2019-ops/Image/main/han/sfw",
            guo_yuyao: GH+"Alunamin/xiancheng/main/guo_yuyao",
            liu_qiyin: GH+"Alunamin/xiancheng/main/liu_qiyin",
            luo_hua: GH+"xuanyuy2019-ops/Image/main/han",
            liu_yuan: R0,xu_mingwei: R0,rong_rourou: R0,
            shen_yang: GH+"AliceNekoqqq/Pic/master/img",
            su_zi_ning: R2,chen_si_yu: R2,
            yunyi: GH+"KronosXup/bangshou-art/main/yunyi",
            peihan: GH+"KronosXup/bangshou-art/main/peihan",
            zhu_peiling: GH+"xm212617-code/-/0d4a190e2d2e33f49455593975c7ec53fa91faab",
            lin_anan: GH+"xm212617-code/-/1b9e52ffecb0e75a013964b85282e65588db7168",
            wu_haiwen: GH+"xm212617-code/-/0381ce2b377901d357c010fcd23a1989b0024384",
            sun_ruixi: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d",
            zhu_yegu: GH+"xm212617-code/-/1fb85db6d57b7ec7705543aacbaa1e5b92d3d303",
            lun_xintong: GH+"duonglanoanh503-code/-/ef624a92337bc56159e82e5fe2d862a669b9b8b9",
            wen_xin: GH+"duonglanoanh503-code/-/b90d73298806755d2272f0c8a80771d4665a5712",
            wen_lan: GH+"duonglanoanh503-code/-/b27295ffa77f14f97a7f03eb82e55c184e81a040",
            hong_xintong: GH+"duonglanoanh503-code/-/d86430fb7ea0109a8a594a52162225f3cc729beb",
            he_ling: GH+"duonglanoanh503-code/-/bd10a003f0e42e1fb78c99af19b5e33561760dc0",
            suyu: R0,chen_shuting: R0,ma_qi: R0,yuan_liping: R0,ming_xiangxiang: R0,
            wen_ruoning: R0,
            zhou_ling: GH+"duonglanoanh503-code/-/3c76be53e4d7c74aa27241ea4c32d405270f06f9",
            pang_ying: GH+"duonglanoanh503-code/-/c473aa71af653948434c690ef74eeb76990f2b79",
            dugu_chuner: GH+"duonglanoanh503-code/-/67d4f29d81f3b33f08600df4ebb8f6713a4c8e97",
            han_zhenzhen: GH+"duonglanoanh503-code/-/05b8ba0a3251ec6b7512198700a778407ec81338",
            zhu_qing: GH+"duonglanoanh503-code/-/a60df006222d2456375d4a4a82cccb5c891637c6",
            zhang_weiwei: GH+"duonglanoanh503-code/-/2bf4f2541f5b92134bad72276e0c25ec11cf49a7",
            tang_qian: GH+"duonglanoanh503-code/-/f014ec4c445df74500b1f5af6f181eab91b6ebd8",
            ya_tao: GH+"duonglanoanh503-code/-/120acb564978aeb91f907320dbae32384dbad0d9",
            ma_qingqing: GH+"duonglanoanh503-code/-/8195007a0f25527f04922b22e343d6f0e52471fa",
            wen_yuan: GH+"duonglanoanh503-code/-/387d9f4f74c153f88c0303dbcf5c55e12ae06166",
            dong_shiqing: GH+"duonglanoanh503-code/-/4067b674693f175f4052f3264843b86ea160a71e",
            chen_yingying: GH+"duonglanoanh503-code/-/b772f1238d8f170b52bd87d407e13a9609aec57c",
            lin_anan_xiaoma: R2,
            an_chunsheng: GH+"duonglanoanh503-code/-/f3401d447cb94253263c62c97779d95437c1432c",
            nake: GH+"duonglanoanh503-code/-/fec4c0286db909a1576ddd3745856a3fadb7271f",
            shaoyao: GH+"duonglanoanh503-code/-/0c71e47b316ce95a47200d04fc469a363fad0f29",
            jin_ning: GH+"duonglanoanh503-code/-/7d558a056af4cbe5d8d804d67505c80fc4bd88da",
            wen_su_da: R2,
            sun_yuanqing: GH+"duonglanoanh503-code/-/ca331f322201fe954018568f01494a5de324936d",
            hai_lin: GH+"duonglanoanh503-code/-/c5c8255226ee5f321b5251974333cdd3fac546fe",
            zhao_xiaoman: R0,zhao_ziyou: R0,lin_muyi: R0,ding_manhong: R0,fang_min: R0,
            su_wantang: R2,
            zhu_yue: GH+"HaoX520/-/refs/heads/main/zhu_yue",
            zhu_juexiang: GH+"HaoX520/-/refs/heads/main/zhu_juexiang",
            wen_xia: GH+"vmkudz-sys/my-image-bed/main",
            lin_jia: GH+"vmkudz-sys/my-image-bed/main",
            xu_yuanji: GH+"xuanyuy2019-ops/Image/main/shenyan",
            xu_yuan: GH+"xuanyuy2019-ops/Image/main/shenyan",
            lin_mo: GH+"moraincoppens-hue/Yachiy0/img/img",
            yang_can: GH+"yiliya443290-a11y/-/main",
            anlin: GH+"xm212617-code/-/666daf0c5d5831009fc91f5009e4bba5cbbcba6b",
            shujing: GH+"xm212617-code/-/b6d31a1e2acf200b038a68233a9d1b726c0a4b13",
            lanxin: GH+"duonglanoanh503-code/-/c242d95f0061c1d51eaecf07be6b9e41f931dc82",
            sunqi: GH+"duonglanoanh503-code/-/a732fb2afff13c00609e7e2adc5d193d1485192a",
            zhao_shiqing: GH+"495996581-coder/image/main/xiancheng",
            weiqingqing: GH+"xs19890106-bot/image-host/refs/heads/main",
            xiao_rongyu: R1,wei_lai: R1,shen_youchu: R1,shen_jingyi: R1,
            wen_qian: R1,luo_man: R1,tang_mi: GH+"HaoX520/-/refs/heads/main/tang_mi",xia_qi: R1,yang_xiaoxue: R1,pei_shuquan: R1,
            zhi_yun: GH+"ningj8622-coder/-1/554d68072b068abbc69fcffc9e1ce657af209c21",luo_ke_ke: GH+"ningj8622-coder/-1/8ce3b51cff803e8db22e90b8639b1cd6a6efcd8d",
            jiang_jingyu: R1,
            li_zhao: R1
          };

          const charOverrides = {
            han_bingjiao: {},guo_yuyao: {},liu_qiyin: {},liu_yuan: {},xu_mingwei: {},rong_rourou: {},
            shen_yang: {
              daily: GH+"AliceNekoqqq/Pic/master/img/1.png",
              uniform: GH+"AliceNekoqqq/Pic/master/img/2.png",
              orgasm: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E9%AB%98%E6%BD%AE.png",
              anal: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E8%82%9B%E4%BA%A4.png",
              sex: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%80%A7%E4%BA%A4.png",
              holding_pee: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%86%8B%E5%B0%BF.png",
              footjob: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E8%B6%B3%E4%BA%A4.png",
              blowjob: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E5%8F%A3%E4%BA%A4.png",
              indoor_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E5%AE%A4%E5%86%85%E9%9C%B2%E5%87%BA%E8%87%AA%E6%8B%8D.png",
              outdoor_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E6%88%B7%E5%A4%96%E9%9C%B2%E5%87%BA%E8%87%AA%E6%8B%8D.png",
              nude_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E5%85%A8%E8%A3%B8%E8%87%AA%E6%8B%8D.png",
              vulva_selfie: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E9%98%B4%E9%83%A8%E8%87%AA%E6%8B%8D.png",
              exhibition: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E9%9C%B2%E5%87%BA.png",
              training: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE-%E8%B0%83%E6%95%99.png",
              anal_training: GH+"AliceNekoqqq/Pic/master/img/%E6%B2%88%E6%BC%BE_%E8%82%9B%E9%97%A8%E8%B0%83%E6%95%99.png",
              nsfw: GH+"AliceNekoqqq/Pic/master/img/3.png"
            },
            su_zi_ning: {},
            sun_ruixi: {
              exhibition: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_exposure.png",
              outdoor_selfie: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_outdoor_exposure_selfie.png",
              indoor_selfie: GH+"xm212617-code/-/ccf87ce04045ddd68967aee30bef021d44fafd6d/sun_ruixi_indoor_exposure_selfie.png"
            },
            zhou_yutong: {
              uniform: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_uniform.png",
              outing: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_outing.png",
              daily: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_daily.png",
              nsfw: GH+"zhamuqiu/tongren2/refs/heads/main/zhou_yutong_nsfw.png"
            },
            zhu_yue: {
              outing: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_outgoing.png",
              underwear: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_daily.png",
              outdoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_nude_selfie.png",
              indoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_outdoor_selfie.png",
              nude_selfie: GH+"HaoX520/-/refs/heads/main/zhu_yue/zhu_yue_vulva_selfie.png"
            },
            zhu_juexiang: {
              outing: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_outgoing.png",
              outdoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_nude_selfie.png",
              indoor_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_outdoor_selfie.png",
              nude_selfie: GH+"HaoX520/-/refs/heads/main/zhu_juexiang/zhu_juexiang_selfie.png"
            },
            xu_yuanji: {},xu_yuan: {},anlin: {},shujing: {},lanxin: {},sunqi: {},
            lin_jia: {uniform: R4, outing: R4, underwear: R4},
            wen_xia: {
              uniform: GH+"vmkudz-sys/my-image-bed/main/lin_wenxia_uniform.png",
              outing: GH+"vmkudz-sys/my-image-bed/main/lin_wenxia_outing.png",
              underwear: GH+"vmkudz-sys/my-image-bed/main/lin_wenxia_daily.png"
            },
            zhi_yun: {
              uniform: GH+"ningj8622-coder/-1/554d68072b068abbc69fcffc9e1ce657af209c21/zhi_yun_uniform.png",luo_ke_ke: {},
              outing: GH+"ningj8622-coder/-1/554d68072b068abbc69fcffc9e1ce657af209c21/zhi_yun_daily.png",
              daily: GH+"ningj8622-coder/-1/554d68072b068abbc69fcffc9e1ce657af209c21/zhi_yun_outing.png",
              nsfw: GH+"ningj8622-coder/-1/554d68072b068abbc69fcffc9e1ce657af209c21/zhi_yun_nsfw.png"
            },
            jiang_jingyu: {
                uniform: R1 + "/jiang_jingyu_uniform.png",
                outing: R1 + "/jiang_jingyu_outing.png",
                daily: R1 + "/jiang_jingyu_daily.png",
                nsfw: R1 + "/jiang_jingyu_nsfw.png"
            },
            li_zhao: {
                uniform: R1 + "/li_zhao_uniform.png",
                outing: R1 + "/li_zhao_outing.png",
                daily: R1 + "/li_zhao_daily.png",
                nsfw: R1 + "/li_zhao_nsfw.png"
            },
            tang_mi: {
                exhibition: GH+"HaoX520/-/refs/heads/main/tang_mi/tang_mi__exhibition.png",
                vulva_selfie: GH+"HaoX520/-/refs/heads/main/tang_mi/tang_mi_vulva_selfie.png"
            }
          };

          function normalizeName(value) {
            return (value || "").replace(/\s+/g, "").trim();
          }
          function getUniqueCharacters(value) {
            return Array.from(new Set(normalizeName(value).split("").filter(Boolean)));
          }
          function getCharacterCoverage(rawName, candidateName) {
            const targetChars = getUniqueCharacters(rawName);
            const candidateChars = getUniqueCharacters(candidateName);
            if (targetChars.length === 0 || candidateChars.length === 0)
              return { matchedCount: 0, requiredCount: 0, coverage: 0 };
            const targetSet = new Set(targetChars);
            const matchedCount = candidateChars.filter((char) => targetSet.has(char)).length;
            const requiredCount = candidateChars.length >= 3 ? 2 : candidateChars.length;
            return { matchedCount, requiredCount, coverage: matchedCount / candidateChars.length };
          }
          function levenshteinDistance(a, b) {
            const s = normalizeName(a);
            const t = normalizeName(b);
            const m = s.length, n = t.length;
            if (m === 0) return n;
            if (n === 0) return m;
            const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
            for (let i = 0; i <= m; i++) dp[i][0] = i;
            for (let j = 0; j <= n; j++) dp[0][j] = j;
            for (let i = 1; i <= m; i++) {
              for (let j = 1; j <= n; j++) {
                const cost = s[i - 1] === t[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
              }
            }
            return dp[m][n];
          }
          function resolveName(rawName) {
            const target = normalizeName(rawName);
            if (!target) return null;
            if (canonicalNames.includes(target)) return target;
            let coverageBestNames = [], coverageBestScore = -1, coverageBestMatchedCount = -1;
            for (const candidate of canonicalNames) {
              const { matchedCount, requiredCount, coverage } = getCharacterCoverage(target, candidate);
              if (matchedCount < requiredCount) continue;
              if (coverage > coverageBestScore || (coverage === coverageBestScore && matchedCount > coverageBestMatchedCount)) {
                coverageBestNames = [candidate];
                coverageBestScore = coverage;
                coverageBestMatchedCount = matchedCount;
              } else if (coverage === coverageBestScore && matchedCount === coverageBestMatchedCount) {
                coverageBestNames.push(candidate);
              }
            }
            if (coverageBestNames.length === 1) return coverageBestNames[0];
            let bestNames = [], bestDistance = Infinity;
            for (const candidate of canonicalNames) {
              const dist = levenshteinDistance(target, candidate);
              if (dist < bestDistance) {
                bestDistance = dist;
                bestNames = [candidate];
              } else if (dist === bestDistance) {
                bestNames.push(candidate);
              }
            }
            if (bestNames.length === 1) {
              const limit = Math.max(1, Math.ceil(Math.min(target.length, bestNames[0].length) * 0.4));
              return bestDistance <= limit ? bestNames[0] : null;
            }
            return null;
          }
          function resolveVariant(rawVariant, sceneType) {
            const value = (rawVariant || "").trim();
            if (variantAliases[value]) return variantAliases[value];
            return sceneType === "NSFW" ? "nsfw" : "daily";
          }
          function parseScene(text) {
            const locationMatch = text.match(/地点[：:]\s*(.+)/);
            const timeMatch = text.match(/时间[：:]\s*(.+)/);
            const sceneTypeMatch = text.match(/场景类型[：:]\s*(SFW|NSFW)/i);
            const charactersMatch = text.match(/在场角色[：:]\s*([\s\S]*?)(?=\n\n|\n<\/SceneInfo>|<\/SceneInfo>|$)/);
            const sceneType = sceneTypeMatch ? sceneTypeMatch[1].trim().toUpperCase() : "SFW";
            const location = locationMatch ? locationMatch[1].trim() : "未知地点";
            const fullTime = timeMatch ? timeMatch[1].trim() : "";
            let dateStr = "", weekdayStr = "", timeStr = "";
            if (fullTime) {
              const detailMatch = fullTime.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s*(周[一二三四五六日])\s*([上中下]午|傍晚|晚上|深夜)\s*(\d{1,2}:\d{2})/);
              if (detailMatch) {
                dateStr = detailMatch[1] + "年" + detailMatch[2] + "月" + detailMatch[3] + "日";
                weekdayStr = detailMatch[4];
                timeStr = detailMatch[5] + " " + detailMatch[6];
              } else {
                dateStr = fullTime;
              }
            }
            let characters = [];
            if (charactersMatch) {
              characters = charactersMatch[1].split("\n").map(function(line) { return line.trim(); })
                .filter(function(line) { return line.startsWith("-"); })
                .map(function(line) { return line.replace(/^\-\s*/, "").trim(); })
                .map(function(line) {
                  var parts = line.split("|").map(function(item) { return item.trim(); });
                  var resolvedName = resolveName(parts[0]);
                  if (!resolvedName) return null;
                  return { name: resolvedName, variant: resolveVariant(parts[1], sceneType) };
                })
                .filter(function(item) { return item !== null; });
            }
            return { location: location, dateStr: dateStr, weekdayStr: weekdayStr, timeStr: timeStr, sceneType: sceneType, characters: characters };
          }
          function getImageUrlInternal(charName, variant, v) {
            var charId = nameToIdMap[charName];
            if (!charId) return null;
            var base = null;
            if (v === 0) {
              base = baseV1[charId] || baseCommon[charId];
            } else {
              base = baseV2[charId] || baseCommon[charId];
            }
            if (!base) return null;
            if (v === 0 && charId === "sun_yitong" && variant === "uniform") {
              return GH + "xm212617-code/-/428e7699609ca4d1ee954aac585276141cedc0e8/sun_yitong_uniform.png";
            }
            if (v === 0 && charId === "lan_ye" && variant === "nsfw") {
              return base + "/lan_ye_nude.png";
            }
            if (v === 1 && charId === 'wen_xia') {
              return GH + 'vmkudz-sys/my-image-bed/main/lin_wenxia_' + variant + '.png';
            }
            if (charOverrides[charId] && charOverrides[charId][variant]) {
              return charOverrides[charId][variant];
            }
            if (charId === 'pei_shuquan' && variant === 'uniform') {
              var ver = Math.random() > 0.5 ? '' : '2';
              return base + '/pei_shuquan_uniform' + ver + '.png';
            }
            if (charId === 'lin_jia' || charId === 'wen_xia') {
              var versions = ['', '2', '3', '4', '5', '6', '7', '8'];
              var ver = versions[Math.floor(Math.random() * versions.length)];
              return base + '/' + charId + ver + '_' + variant + '.png';
            }
            return base + '/' + charId + '_' + variant + '.png';
          }

          var parsed = parseScene(sceneText);

          /* Apply scene type theme */
          var scenePanel = wrapper.querySelector('.scene-info-panel');
          if (scenePanel && parsed.sceneType) {
            scenePanel.setAttribute('data-scene', parsed.sceneType);
          }

          /* Apply time-of-day theme */
          function getTimeOfDay(timeStr) {
            if (!timeStr) return 'day';
            var hour = 12;
            var m = timeStr.match(/(\d{1,2}):(\d{2})/);
            if (m) hour = parseInt(m[1]);
            var period = timeStr.match(/(凌晨|清晨|早晨|早上|上午|中午|正午|下午|傍晚|晚上|晚|深夜)/);
            var p = period ? period[1] : '';
            if (p === '凌晨' || p === '深夜' || (p === '晚上' && hour >= 22) || (p === '晚' && hour >= 22)) return 'latenight';
            if (p === '晚上' || p === '晚' || (p === '傍晚') || (hour >= 18 && hour < 22)) return 'night';
            if (p === '傍晚' || (p === '下午' && hour >= 16)) return 'dusk';
            if (p === '下午' || (p === '放学') || (p === '放学后')) return 'afternoon';
            if (p === '中午' || p === '正午') return 'noon';
            if (p === '上午') return 'morning';
            if (p === '凌晨' || p === '清晨' || p === '早晨' || p === '早上') return 'dawn';
            if (hour >= 0 && hour < 5) return 'latenight';
            if (hour >= 5 && hour < 8) return 'dawn';
            if (hour >= 8 && hour < 12) return 'morning';
            if (hour >= 12 && hour < 14) return 'noon';
            if (hour >= 14 && hour < 17) return 'afternoon';
            if (hour >= 17 && hour < 19) return 'dusk';
            if (hour >= 19 && hour < 23) return 'night';
            return 'latenight';
          }

          /* Apply weather theme (from location/scene text, excluding character names) */
          function getWeatherFromScene(sceneText) {
            /* Exclude character names that contain weather-related characters */
            var excludeNames = ['杨小雪','白晓雪','苏雨','云伊','陈思雨','郭雨瑶','赵诗晴','韩冰娇','沈漾','沈幼楚','林听晚','沈静宜','温若宁','海霖','夏祈','赵小满','赵自由'];
            var lines = sceneText.split('\n');
            for (var li = 0; li < lines.length; li++) {
              var line = lines[li].trim();
              /* Only check location and time lines, skip character lines */
              if (line.indexOf('在场角色') >= 0) break;
              if (line.indexOf('地点') >= 0 || line.indexOf('时间') >= 0) {
                /* Check for weather keywords in non-character context */
                var lowerLine = line.toLowerCase();
                if (line.indexOf('暴雨') >= 0 || line.indexOf('大雨') >= 0 || line.indexOf('雷阵雨') >= 0 || line.indexOf('雷雨') >= 0) return 'storm';
                if (line.indexOf('小雨') >= 0 || line.indexOf('中雨') >= 0 || line.indexOf('阵雨') >= 0 || line.indexOf('毛毛雨') >= 0) return 'rain';
                if (line.indexOf('下雪') >= 0 || line.indexOf('小雪') >= 0 || line.indexOf('大雪') >= 0 || line.indexOf('暴雪') >= 0 || line.indexOf('飘雪') >= 0) return 'snow';
                if (line.indexOf('大雾') >= 0 || line.indexOf('雾') >= 0) return 'fog';
              }
            }
            /* Also check the full scene text for explicit weather field */
            var weatherMatch = sceneText.match(/天气[：:]\s*(.+)/);
            if (weatherMatch) {
              var w = weatherMatch[1];
              if (w.indexOf('雨') >= 0 && w.indexOf('雷') >= 0) return 'storm';
              if (w.indexOf('雨') >= 0) return 'rain';
              if (w.indexOf('雪') >= 0) return 'snow';
              if (w.indexOf('雾') >= 0) return 'fog';
            }
            return null;
          }

          var timeOfDay = getTimeOfDay(parsed.timeStr || '');
          if (scenePanel) {
            scenePanel.setAttribute('data-timeofday', timeOfDay);
          }
          var weather = getWeatherFromScene(sceneText);
          if (weather && scenePanel) {
            scenePanel.setAttribute('data-weather', weather);
          }

          if (parsed.dateStr)
            metaContainer.innerHTML += '<div class="meta-row"><span class="meta-dot"></span><span>' + parsed.dateStr + (parsed.weekdayStr ? ' ' + parsed.weekdayStr : '') + '</span></div>';
          if (parsed.timeStr)
            metaContainer.innerHTML += '<div class="meta-row"><span class="meta-dot"></span><span>' + parsed.timeStr + '</span></div>';
          if (parsed.location)
            metaContainer.innerHTML += '<div class="meta-row"><span class="meta-dot"></span><span>' + parsed.location + '</span></div>';

          function renderCharacters() {
            if (parsed.characters.length > 0) {
              var displayChars = parsed.characters.slice(0, 3);
              charContainer.innerHTML = '<div class="character-grid">' + displayChars.map(function(char) {
                var fallbackVar = parsed.sceneType === "NSFW" ? "nsfw" : "daily";
                var targetVariant = char.variant || fallbackVar;
                var urlV1 = getImageUrlInternal(char.name, targetVariant, 0) || getImageUrlInternal(char.name, fallbackVar, 0);
                var urlV2 = getImageUrlInternal(char.name, targetVariant, 1) || getImageUrlInternal(char.name, fallbackVar, 1);
                var frontUrl = urlV1;
                var backUrl = urlV2;
                var frontAlt = "V1";
                var backAlt = "V2";
                if (urlV1 && urlV2 && urlV1 !== urlV2) {
                  if (Math.random() > 0.5) {
                    frontUrl = urlV2;
                    backUrl = urlV1;
                    frontAlt = "V2";
                    backAlt = "V1";
                  }
                }
                var flipClass = isGloballyFlipped ? "is-flipped" : "";
                var fallbackText = fallbackAvatars[char.name] || "?";
                var charColor = CHAR_COLOR_MAP[char.name] || null;
                return '<div class="character-card ' + flipClass + '" onclick="this.classList.toggle(\'is-flipped\')">' +
                  '<div class="card-inner" style="border-color:' + (charColor ? charColor + '60' : 'rgba(255,255,255,0.6)') + ';">' +
                  '<div class="card-face card-front">' +
                  '<div class="flip-hint" style="' + (charColor ? 'background:' + charColor + '30;' : '') + '"><svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="' + (charColor || 'var(--accent)') + '"/></svg></div>' +
                  '<div class="character-avatar">' +
                  (frontUrl ? '<img src="' + frontUrl + '" alt="' + char.name + ' ' + frontAlt + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';"><div class="character-avatar-fallback" style="display:none;">' + fallbackText + '</div>' : '<div class="character-avatar-fallback" style="color:' + (charColor || 'rgba(136,117,114,0.4)') + ';">' + fallbackText + '</div>') +
                  '</div>' +
                  '<div class="character-name" style="color:' + (charColor || 'var(--ink)') + ';">' + char.name + '</div>' +
                  '</div>' +
                  '<div class="card-face card-back">' +
                  '<div class="flip-hint" style="' + (charColor ? 'background:' + charColor + '30;' : '') + '"><svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="' + (charColor || 'var(--accent)') + '"/></svg></div>' +
                  '<div class="character-avatar">' +
                  (backUrl ? '<img src="' + backUrl + '" alt="' + char.name + ' ' + backAlt + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';"><div class="character-avatar-fallback" style="display:none;">' + fallbackText + '</div>' : '<div class="character-avatar-fallback" style="color:' + (charColor || 'rgba(136,117,114,0.4)') + ';">' + fallbackText + '</div>') +
                  '</div>' +
                  '<div class="character-name" style="color:' + (charColor || 'var(--ink)') + ';">' + char.name + '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>';
              }).join('') + '</div>';
            }
          }

          renderCharacters();
          collapseBtn.onclick = function() {
            charContainer.classList.toggle("collapsed");
            collapseIcon.classList.toggle("collapsed");
            collapseText.textContent = charContainer.classList.contains("collapsed") ? "展开立绘" : "收起立绘";
          };

          switchVersionBtn.onclick = function() {
            isGloballyFlipped = !isGloballyFlipped;
            var cards = wrapper.querySelectorAll(".character-card");
            if (isGloballyFlipped) {
              versionText.textContent = "🔄 恢复初始立绘";
              cards.forEach(function(card, index) {
                setTimeout(function() { card.classList.add("is-flipped"); }, index * 80);
              });
            } else {
              versionText.textContent = "🔄 翻转全部立绘";
              cards.forEach(function(card, index) {
                setTimeout(function() { card.classList.remove("is-flipped"); }, index * 80);
              });
            }
          };
        })();
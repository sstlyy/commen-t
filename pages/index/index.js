Page({
  data: {
  talks: [],
  touchStart: 0,
  inputValue: '',
  inputBiaoqing: '',
  faces: ['http://www.17qq.com/img_qqtouxiang/89471698.jpeg','http://17qq.com/cache/images/be98673d07c23daf.jpg'],
  names: ['贝贝', '晶晶', '欢欢', '妮妮'],
  isShow: false, //控制emoji表情是否显示 
  isLoad: true, //解决初试加载时emoji动画执行一次
  cfBg: false,
  emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
  //0x1f---
  emoji: [
    "01", "02", "03", "04", "05", "06", "07", "08", "09","10", 
    "11", "12", "13", "14", "15", "16", "17", "18", "19","20", 
    "21", "22", "23", "24", "25", "26", "27", "28", "29","30", 
    "31", "32", "33", "34", "35", "36", "37", "38", "39","40", 
    "41", "42", "43", "44", "45", "46", "47", "48", "49","50", 
    "51", "52", "53", "54", "55", "56", "57","58",
  ],
  emojis: [], //qq、微信原始表情
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var em = {}, that = this, emChar = that.data.emojiChar.split("-");
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: v
      };
      emojis.push(em)
    });
       that.setData({
        emojis: emojis
      })
  },

  onReady: function() {
    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
     duration: 400, // 整个动画过程花费的时间，单位为毫秒
     timingFunction: "ease", // 动画的类型
     delay: 0 // 动画延迟参数
    })
    },

      showTalks: function() {
      // 加载数据
      this.loadTalks();
      // 设置动画内容为：使用绝对定位显示区域，高度变为100%
      this.animation.bottom("0rpx").height("100%").step()
      this.setData({
       talksAnimationData: this.animation.export()
      })
      },
      
      hideTalks: function() {
      // 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
      this.animation.bottom("-100%").height("0rpx").step()
      this.setData({
       talks: [],
       talksAnimationData: this.animation.export()
      })
      },
      
      // 加载数据
      loadTalks: function() {
      // 随机产生一些评论
      wx.showNavigationBarLoading();
      let that = this;
      let talks = [];
      let faces = ['http://www.17qq.com/img_qqtouxiang/89471698.jpeg','http://17qq.com/cache/images/be98673d07c23daf.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3949133575,3251995625&fm=26&gp=0.jpg','http://17qq.com/cache/images/7fe040abd4cc45be.jpg','http://17qq.com/cache/images/d49387293f107422.jpg'
      ];
      let names = ['佳佳', '晶晶', '欢欢', '妮妮', '娜娜', '锅锅'];
      let contents = ['为什么你总是对我不理不睬呢', '干嘛老是不见你了', '我们都有字节的梦想', '你有什么资格不努力呢'];
      let talktime = '刚刚';
      console.log(talktime)
      talks = talks.concat(that.data.talks);
      
      // 随机产生3条评论
      for (var i = 0; i < 3; i++) {
       talks.push({
       avatarUrl: faces[Math.floor(Math.random() * faces.length)],
       nickName: names[Math.floor(Math.random() * names.length)],
       content: contents[Math.floor(Math.random() * contents.length)],
       talkTime: talktime
       });
      }
      this.setData({
       talks: talks,
       talksAnimationData: that.animation.export()
      })
      wx.hideNavigationBarLoading();
      },
      
      // onScrollLoad: function() {
      // // 滚动评论区加载新数据加载新的数据
      // this.loadTalks();
      // },

  //解决滑动穿透问题
  emojiScroll: function(e) {
  console.log(e)
  },

  //点击表情显示隐藏表情盒子
  emojiShowHide: function() {
  this.setData({
   isShow: !this.data.isShow,
   isLoad: false,
   cfBg: !this.data.false
  })
  },

  //表情选择
  emojiChoose: function(e) {
  console.log(e)
  //当前输入内容和表情合并
  this.data.inputValue+= e.currentTarget.dataset.emoji;
  console.log(this.data.inputValue)
  this.setData({
   inputValue: this.data.inputValue
  })
  },

  //点击emoji背景遮罩隐藏emoji盒子
  cemojiCfBg: function() {
  console.log('womenlai')
  this.setData({
   isShow: false,
   cfBg: false
  })
  },

  //下拉评论框隐藏
  touchStart: function(e) {
  let touchStart = e.touches[0].clientY;
  this.setData({
   touchStart,
  })
  },
 
  //输入框失去焦点时触发
  bindInputBlur: function(e) {
  console.log(e)
  console.log(this.data.inputBiaoqing)
  this.data.inputValue = e.detail.value + this.data.inputBiaoqing;
  },

  //点击发布，发布评论
  faBu: function() {
  let that = this;
  this.data.talks.unshift({
   avatarUrl: this.data.faces[Math.floor(Math.random() * this.data.faces.length)],
   nickName: this.data.names[Math.floor(Math.random() * this.data.names.length)],
   content: this.data.inputValue,
   talkTime: '刚刚'
  })
  that.data.inputValue = '';
  that.setData({
   talks: that.data.talks,
   inputValue: that.data.inputValue,
   talksAnimationData: that.animation.export()
  })
  
  }
 })
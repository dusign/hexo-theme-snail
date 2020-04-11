//创建一个音乐播放器的类 单例模式
class Player {
    constructor() { //类的构造函数
        //如果类已经有实例了，就返回这个实例
        if (Player.instance) return Player.instance;
        //如果没有实例化，就去构造一个实例
        return this.getInstance(...arguments);
    }

    //构建实例
    getInstance() {
        let instance = new PlayerCreator(...arguments);
        //让实例可以使用到Player的原型的属性方法
        // instance.__proto__=Player.prototype;
        // instance.constructor=Player;
        //把构建好的实例挂在Player类上
        Player.instance = instance;
        return instance;
    }
}

//歌曲信息
class Musics {
    //歌曲
    constructor() {
        $.ajaxSettings.async = false;
        var data = $.getJSON('https://api.uomg.com/api/rand.music?', {
            sort: '热歌榜',
            format: 'json'
        }).responseJSON;
        this.songs = [{
            id: data.code,
            title: data.data.name,
            singer: data.data.artistsname,
            songUrl: data.data.url,
            imageUrl: data.data.picurl
        }];
    }
    //根据索引获取歌曲的方法
    getSongByNum(index) {
        $.ajaxSettings.async = false;
        var data = $.getJSON('https://api.uomg.com/api/rand.music?', {
            sort: '热歌榜',
            format: 'json'
        }).responseJSON;
        var songs = [{
            id: data.code,
            title: data.data.name,
            singer: data.data.artistsname,
            songUrl: data.data.url,
            imageUrl: data.data.picurl
        }];
        return songs[0];
    }
}

//真正的构建播放器的类
class PlayerCreator {
    constructor() {
        this.audio = document.querySelector('.music-player__audio') // Audio dom元素, 因为很多api都是需要原生audio调用的，所以不用jq获取
        // this.audio.muted = true; // 控制静音
        this.audio.volume = 0.8;

        //工具
        this.util = new Util();
        this.musics = new Musics(); //歌曲信息
        this.song_index = 0; // 当前播放的歌曲索引
        this.loop_mode = 0; // 1 2
        // 下方歌曲列表容器
        this.song_list = $('.music__list_content');

        this.render_doms = { //切换歌曲时需要渲染的dom组
            title: $('.music__info--title'),
            singer: $('.music__info--singer'),
            image: $('.music-player__image img'),
            blur: $('.music-player__blur')
        }
        this.ban_dom = { //禁音时需要渲染的dom组
            control__btn: $('.control__volume--icon')
        }

        // 时间显示容器
        this.render_time = {
            now: $('.nowTime'),
            total: $('.totalTime')
        }

        // 唱片
        this.disc = {
            image: $('.music-player__image'),
            pointer: $('.music-player__pointer')
        };
        //播放器初始化
        this.init();
    }
    //初始化函数
    init() {
        this.renderSongList();
        this.renderSongStyle();
        this.bindEventListener();
    }
    //生成播放列表
    renderSongList() {
        let _str = '';
        this.musics.songs.forEach((song, i) => {
            _str += `<li class="music__list__item">${song.title}</li>`
        });
        this.song_list.html(_str);
    }

    //根据歌曲去渲染视图
    renderSongStyle() {
        let {
            title,
            singer,
            songUrl,
            imageUrl
        } = this.musics.getSongByNum(this.song_index);
        this.audio.src = songUrl;
        this.render_doms.title.html(title);
        this.render_doms.singer.html(singer);
        this.render_doms.image.prop('src', imageUrl);
        this.render_doms.blur.css('background-image', 'url("' + imageUrl + '")');

        //切换列表中的item的类名 play
        this.song_list.find('.music__list__item').eq(this.song_index).addClass('play').siblings().removeClass('play');
    }
    //绑定各种事件
    bindEventListener() {
        //播放按钮
        this.$play = new Btns('.player-control__btn--play', {
            click: this.handlePlayAndPause.bind(this)
        });
        //上一首
        this.$prev = new Btns('.player-control__btn--prev', {
            click: this.changeSong.bind(this, 'prev')
        });
        //下一首
        this.$next = new Btns('.player-control__btn--next', {
            click: this.changeSong.bind(this, 'next')
        });
        //循环模式
        this.$mode = new Btns('.player-control__btn--mode', {
            click: this.changePlayMode.bind(this)
        });
        //禁音
        this.$ban = new Btns('.control__volume--icon', {
            click: this.banNotes.bind(this)
        })
        //列表点击
        this.song_list.on('click', 'li', (e) => {
            let index = $(e.target).index();
            this.changeSong(index);
        })

        //音量控制 audio标签音量 vlouem 属性控制0-1

        new Progress('.control__volume--progress', {
            min: 0,
            max: 1,
            value: this.audio.volume,
            handler: (value) => { //更改进度时
                this.audio.volume = value;
            }
        })


        //歌曲进度 this.audio.duration

        //可以播放的时候触发（歌曲的基本信息都已经获取到了）
        this.audio.oncanplay = () => {
            //避免重复实例化
            if (this.progress) {
                this.progress.max = this.audio.duration; //切换歌曲后更新时长
                this.render_time.total.html(this.util.formatTime(this.audio.duration));
                return false;
            };
            this.progress = new Progress('.player__song--progress', {
                min: 0,
                max: this.audio.duration,
                value: 0,
                handler: (value) => {
                    this.audio.currentTime = value;
                }
            })
            //调整总时长
            this.render_time.total.html(this.util.formatTime(this.audio.duration));
        }

        //会在播放的时候持续触发
        this.audio.ontimeupdate = () => {
            this.progress.setValue(this.audio.currentTime);
            //调整当前时长
            this.render_time.now.html(this.util.formatTime(this.audio.currentTime));
        }

        //当歌曲播放完成的时候
        this.audio.onended = () => {
            this.changeSong('next');
            //播放完，换歌后，重新播放
            this.audio.play();
        }

    }

    //播放暂停控制
    handlePlayAndPause() {
        let _o_i = this.$play.$el.find('i');
        //this.audio.pauseed值为true 说明目前是不播放
        if (this.audio.paused) { //现在是暂停的 要播放
            this.audio.play();
            _o_i.removeClass('icon-play').addClass('icon-pause');
            this.disc.image.addClass('play');
            this.disc.pointer.addClass('play')
        } else {
            this.audio.pause();
            _o_i.addClass('icon-play').removeClass('icon-pause');
            this.disc.image.removeClass('play');
            this.disc.pointer.removeClass('play');
        }
    }

    //更改循环模式
    changePlayMode() {
        this.loop_mode++;
        if (this.loop_mode > 2) this.loop_mode = 0;
        this.renderPlayMode();
    }
    //更改按钮样式
    renderPlayMode() {
        let _classess = ['loop', 'random', 'single'];
        let _o_i = this.$mode.$el.find('i');
        //prop 改一些标签的自有属性 attr改一些标签的自定义属性
        _o_i.prop('class', 'iconfont icon-' + _classess[this.loop_mode])
    }

    //更改歌曲索引
    changeSongIndex(type) {
        if (typeof type === 'number') {
            this.song_index = type;
        } else {
            if (this.loop_mode === 0) {
                //列表循环
                this.song_index += type === 'next' ? 1 : -1;
                if (this.song_index > this.musics.songs.length - 1) this.song_index = 0;
                if (this.song_index < 0) this.song_index = this.musics.songs.length - 1;
            } else if (this.loop_mode === 1) {
                //随机播放
                let _length = this.musics.songs.length;
                let _random = Math.floor(Math.random() * _length);
                for (let i = 0; i < 10000; i++) { //随机的数为本身则继续随机
                    if (this.song_index == _random) {
                        _random = Math.floor(Math.random() * _length);
                    } else {
                        this.song_index = _random;
                        break;
                    }
                }
            } else if (this.loop_mode === 2) {
                this.song_index = this.song_index;
            }
        }
    }
    //歌曲时长
    songTime() {
        let totalMinute = parseInt(this.audio.duration / 60) < 10 ? "0" + parseInt(this.audio.duration / 60) : parseInt(this.audio.duration / 60);
        let totalSecond = parseInt(this.audio.duration % 60) < 10 ? "0" + parseInt(this.audio.duration % 60) : parseInt(this.audio.duration % 60);
        $('.totalTime').text(totalMinute + ':' + totalSecond);
    }
    //切换歌曲
    changeSong(type) {
        //更改索引
        this.changeSongIndex(type);
        //记录切歌前的状态
        let _is_pause = this.audio.paused;
        //切歌后更改视图显示
        this.renderSongStyle();
        //如果切歌前是在播放，就继续播放
        if (!_is_pause) this.audio.play();
    }
    //禁音
    banNotes() {
        let _o_i = this.$ban.$el.find("i");
        if (this.audio.muted == true) { //如果禁音则开启
            this.audio.muted = false;
            _o_i.removeClass('icon-muted').addClass('icon-volume');
        } else {
            this.audio.muted = true;
            _o_i.removeClass('icon-volume').addClass('icon-muted');
        }
    }
}

//进度条
class Progress {
    constructor(selector, options) {
        $.extend(this, options);
        ///给this挂载传入的参数
        this.$el = $(selector);
        this.width = this.$el.width();
        this.init();
    }

    //进度条初始化
    init() {
        this.renderBackAndPointer();
        //this.bindEvents();
        this.drag();
        this.value;
        this.changeDOMStyle(this.width * this.value);
    }
    //为进度条渲染back和pointer
    renderBackAndPointer() {
        this.$back = $('<div class="back">');
        this.$pointer = $('<div class="pointer">');

        this.$el.append(this.$back);
        this.$el.append(this.$pointer);
    }

    setValue(value) { //主动调用，传入value值，设置进度条样式
        let _distance = this.width * value / (this.max - this.min);
        this.changeDOMStyle(_distance);
    }

    drag() {
        let ele = this.$pointer;
        let father = this.$el;
        let flag = false; //鼠标是否点击
        ele.mousedown((e) => {
            flag = true;
            let mousePos = {
                x: e.offsetX
            }
            $(document).mousemove((e) => {
                if (flag === true) {
                    let _left = e.clientX - father.offset().left - mousePos.x;
                    let _distance = Math.max(0, Math.min(_left, father.outerWidth(false) - ele.outerWidth(false)))
                    let _ratio = _distance / father.outerWidth(false);
                    let _value = _ratio * (this.max - this.min); //当前的音量值
                    this.changeDOMStyle(_distance);
                    this.handler(_value); //更改进度之后，执行回调
                }
            })
        })
        $(document).mouseup(() => {
            flag = false;
        })

    }

    bindEvents() { //鼠标点击时更改
        this.$el.click((e) => {
            let _x = e.offsetX; //鼠标距离元素左边的距离
            let _ratio = _x / this.width;
            let _value = _ratio * (this.max - this.min); //当前的音量值
            this.changeDOMStyle(_x);
            this.handler(_value); //更改进度之后，执行回调
        })
    }
    //更改pointer和back
    changeDOMStyle(distance) {
        this.$back.width(distance + 7 == 7 ? 0 : distance + 7);//进度为0时将进度条背景改为0否则加上进度按钮的长度
        this.$pointer.css('left', distance + 'px');
    }
}


//按钮类 
class Btns {
    constructor(selector, handlers) {
        this.$el = $(selector); //元素
        this.bindEvents(handlers);
    }
    bindEvents(handlers) { //绑定事件
        for (const event in handlers) {
            //使用值的时候保证键值对在对象中是存在的
            if (handlers.hasOwnProperty(event)) {
                this.$el.on(event, handlers[event]);
            }
        }
    }
}
new Player();
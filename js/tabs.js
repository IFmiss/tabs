(function($){
	//选项卡
	$.fn.tabs = function(options) {
		return this.each(function(){
			var defaultvalue = {
	    		maxWidth: 									700, 							//最大宽度
	    		activeIndex: 								0,								//默认的激活索引 
	    		menuPosition: 								'left',							//pc状态下菜单的位置  left right
	    		menubackground: 							'rgba(0,0,0,0.5)',  			//菜单的背景色
	    		menuActivebackground: 						'rgba(77,150,223,0.5)', 		//菜单激活状态下的背景色
	    		isShowAll: 									false, 							//在移动端点击时候是否显示所有列表
	    		fnEvent: 									'click', 						//触发的类型   click  或者 mouseover
	    		source: 									[
	    														{
	    															title:'tabs title 1',
	    															content: [{
																		title: "this is content sectiontitle 1",
																		description: "this is content description1",
																		hasTitle: true
																	},{
																		title: "this is content sectiontitle 2",
																		description: "this is content description1",
																		hasTitle: true
																	}]
	    														},{
	    															title:'tabs title 2',
	    															content: [{
																		description: "this is content description2",
																		hasTitle: false
	    															}]
	    														},{
	    															title:'tabs title 3',
	    															content: [{
																		title: "this is content title 3",
																		description: "this is content description3",
																		hasTitle: true
																	}]
	    														}
	    													],
	    	};

	    	var opt = $.extend(defaultvalue,options || {});

	    	var sourceLength = opt.source.length;
	    	// alert(opt.source[0].content.description);

	    	var $this = $(this),
	    		_this = this;
	    	defaultvalue._init = function(){
	    		$this.css({
	    			'maxWidth':opt.maxWidth,
	    		});

	    		_this.tabs_wrapper = $('<div class="cpt-tabs-wrapper""></div>').appendTo($this);
	    		_this.tabs_info = $('<div class="tabs-info dw-boot-row"></div>').appendTo(_this.tabs_wrapper);

	    		_this.tabs_pc = $('<div class="tabs-pc dw-boot-col-sm-12"><div>').appendTo(_this.tabs_info);
	    		_this.tabs_mobile = $('<div class="tabs-mobile">"><div>').appendTo(_this.tabs_info);

	    		// PCtite
	    		_this.pc_title = $('<div class="title dw-boot-col-sm-3"></div>').css({
	    			"float":opt.menuPosition,
	    		}).appendTo(_this.tabs_pc);
	    		_this.ul_pc_title = $('<ul class="ul-pctabs-title"></div>').appendTo(_this.pc_title);

	    		//PCcontent
	    		_this.pc_content = $('<div class="content dw-boot-col-sm-9"></div>').css({
	    			"float":opt.menuPosition,
	    		}).appendTo(_this.tabs_pc);
	    		_this.ul_pc_content = $('<ul class="ul-pctabs-content"></div>').appendTo(_this.pc_content);

	    		//mobile
	    		_this.ul_mobile = $('<ul class="ul-tabs-info dw-boot-row"></ul>').appendTo(_this.tabs_mobile);

	    		var iconClassName = 'dw-icon-add';

	    		for (var i = 0 ; i < sourceLength; i++) {
	    			if(opt.activeIndex === i){
	    				iconClassName = 'dw-icon-reduce';
	    				_this.li_pc_content = $('<li class="li-pctbas-content active"></div>').appendTo(_this.ul_pc_content);
	    				_this.li_pc_title = $('<li class="li-pctbas-title txt-textOneRow active">'+opt.source[i].title+'</li>').appendTo(_this.ul_pc_title);

	    				//mobile
	    				_this.li_mobile = $('<li class="li-tabs-info  dw-boot-col-sm-12 active">').appendTo(_this.ul_mobile);
	    			}else{
	    				iconClassName = 'dw-icon-add';
	    				_this.li_pc_content = $('<li class="li-pctbas-content"></div>').appendTo(_this.ul_pc_content);
	    				_this.li_pc_title = $('<li class="li-pctbas-title txt-textOneRow">'+opt.source[i].title+'</li>').appendTo(_this.ul_pc_title);

	    				//mobile
	    				_this.li_mobile = $('<li class="li-tabs-info  dw-boot-col-sm-12"></li>').appendTo(_this.ul_mobile);
	    			}


	    			_this.div_mobile_title = $('<div class="div-tabs-title"><div>').appendTo(_this.li_mobile);
	    			_this.h1_mobile_title = $('<h1 class="h1-tabs-title dw-boot-col-sm-3 txt-textOneRow">'+opt.source[i].title+'</h1>').appendTo(_this.div_mobile_title);
	    			_this.i_mobile_icon = $('<i class="titleStatus '+iconClassName+'"></i>').appendTo(_this.div_mobile_title);

	    			_this.div_mobile_content = $('<div class="div-tabs-content dw-boot-col-sm-9"></div>').appendTo(_this.li_mobile);


	    			var sectionLength = opt.source[i].content.length;

	    			for(var j = 0 ; j < sectionLength; j++){
	    				_this.div_pc_section = $('<div class="section"></div>').appendTo(_this.li_pc_content);
	    				_this.div_mobile_section = $('<div class="section"></div>').appendTo(_this.div_mobile_content);

	    				if(opt.source[i].content[j].hasTitle){
	    					_this.pc_section_title = $('<h1 class="h1-section-title">'+opt.source[i].content[j].title+'</h1>').appendTo(_this.div_pc_section);
	    					_this.mobile_section_title = $('<h1 class="h1-section-title">'+opt.source[i].content[j].title+'</h1>').appendTo(_this.div_mobile_section);
	    				}

	    				_this.pc_section_description = $('<p class="h1-section-content">'+opt.source[i].content[j].description+'</div>').appendTo(_this.div_pc_section);
	    				_this.mobile_section_description = $('<p class="h1-section-content">'+opt.source[i].content[j].description+'</div>').appendTo(_this.div_mobile_section);

	    			}
	    		}
	    		// _this.

	    		defaultvalue._event();
	    	}

	    	defaultvalue._event = function(){
	    		var e = opt.fnEvent;
	    		_this.ul_pc_title.find('li').on(e,function(){
	    			var index = $(this).index();
	    			$(this).addClass('active').stop().siblings().removeClass('active');
					_this.ul_pc_content.find('li').eq(index).addClass('active').stop().siblings().removeClass('active');
					_this.ul_mobile.find('li').eq(index).addClass('active').stop().siblings().removeClass('active');
	    		});

	    		_this.ul_mobile.find('li').on(e,function(){
	    			var index = $(this).index();

					if(opt.isShowAll){
						$(this).toggleClass('active');
						if($(this).find('.titleStatus').hasClass('dw-icon-add')){
							$(this).find('.titleStatus').removeClass('dw-icon-add').addClass('dw-icon-reduce');
						}else{
							$(this).find('.titleStatus').removeClass('dw-icon-reduce').addClass('dw-icon-add');
						};
					}else{
						$(this).addClass('active');
						$(this).stop().siblings().removeClass('active');
						$(this).find('.titleStatus').removeClass('dw-icon-add').addClass('dw-icon-reduce');
						$(this).siblings().find('.titleStatus').removeClass('dw-icon-reduce').addClass('dw-icon-add');
					}

					_this.ul_pc_title.find('li').eq(index).addClass('active').stop().siblings().removeClass('active');
					_this.ul_pc_content.find('li').eq(index).addClass('active').stop().siblings().removeClass('active');
	    		});
	    	}

	    	defaultvalue._init();
		})
	}
})(jQuery)
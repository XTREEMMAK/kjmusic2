/* FWDMSPATB */
(function (window){
var FWDMSPATB = function(
			controller,
			parent
		){

		'use strict';

		var _s = this;
		var prototype = FWDMSPATB.prototype;
		var _d = parent._d;
		var parentScrubber_do;
		var parentScrubberBkMiddle_do;

		_s.useHEX = controller.useHEX;
		_s.timeBackgroundColor = controller._d.atbTimeBackgroundColor;
		_s.timeTextColorNormal = controller._d.atbTimeTextColorNormal;
		_s.timeTextColorSelected = controller._d.atbTimeTextColorSelected;
		_s.btnTxtNC = controller._d.atbButtonTextNormalColor;
		_s.btnTxtSC = controller._d.atbButtonTextSelectedColor;
		_s.btnBkNC = controller._d.atbButtonBackgroundNormalColor;
		_s.btnBkSC = controller._d.atbButtonBackgroundSelectedColor;
		this.embedWindowCloseButtonMargins = controller._d.playbackRateButtonsMargins;
		this.isMobile_bl = FWDMSPUtils.isMobile;
		_s.pa = 0;
		_s.pb = 1;
		_s.useVectorIcons_bl = _d.useVectorIcons;

		//##########################################//
		/* initialize _s */
		//##########################################//
		_s.init = function(){
			if(_s.clsBtn) return;
			_s.mainHolder_do = new FWDMSPDisplayObject("div");
			_s.addChild(_s.mainHolder_do);
			
			_s.bk_do = new FWDMSPDisplayObject("div");
			_s.bk_do.screen.className = 'fwdmsp-window-background';
			_s.bk_do.getStyle().width = "100%";
			_s.bk_do.getStyle().height = "100%";
			_s.bk_do.setAlpha(.9);
			_s.bk_do.getStyle().background = "url('" + _d.shareBkPath_str + "')";
			_s.mainHolder_do.addChild(_s.bk_do);

			_s.setupLeftAndRight();
			_s.setupMainScrubber();
		
			//setup close button
			FWDMSPSimpleButton.setPrototype();
			if(_s.useVectorIcons_bl){
				_s.clsBtn = new FWDMSPSimpleButton(
						0, 0, 0, 0, 0, 0, 0,
						"<div class='table-fwdmsp-button'><span class='table-cell-fwdmsp-button fwdmsp-icon-close'></span></div>",
						"fwdmsp-categories-next-and-prev-normal-state",
						"fwdmsp-categories-next-and-prev-selected-state"
				);
			}else{
				_s.clsBtn = new FWDMSPSimpleButton(_d.closeClooseN_img, _d.playbackRateClosePathS_str, undefined,
						true,
						_s.useHEX,
						_d.nBC,
						_d.selectedButtonsColor_str, 
						false, false, false, true);
			}
			_s.clsBtn.screen.className = 'fwdmsp-close-button';
			_s.clsBtn.addListener(FWDMSPSimpleButton.MOUSE_UP, _s.closeButtonOnMouseUpHandler);
			_s.mainHolder_do.addChild(_s.clsBtn); 

			if(window['isWhite']){
				_s.clsBtn.n_do.screen.src = window['catsClsBk'];
			}
		};

		this.closeButtonOnMouseUpHandler = function(){
			if(!_s.isShowed_bl) return;
			_s.hide(true);
		};

		_s.positionAndResize = function(){
			if(!_s.clsBtn) return;
			_s.sW = controller.sW;
			_s.sH = controller.sH;
			
			var buttonfinalX = _s.sW - _s.clsBtn.w - _s.embedWindowCloseButtonMargins;
			var buttonFinalY = _s.embedWindowCloseButtonMargins;
			var finalY = 0;

			_s.clsBtn.setX(buttonfinalX);
			_s.clsBtn.setY(buttonFinalY);

			_s.setWidth(_s.sW);
			_s.setHeight(_s.sH);
			
			_s.mainHolder_do.setWidth(_s.sW);
			_s.mainHolder_do.setHeight(_s.sH);
		
			if(_s.bk_do){
				_s.bk_do.setWidth(_s.sW);
				_s.bk_do.setHeight(_s.sH);
			}
			
			_s.positionText();
			_s.positionButtons();
			_s.resizeProgress();
			_s.resizeMainScrubber();
			setTimeout(function(){
				_s.positionText();
				_s.positionButtons();
				_s.resizeProgress();
				_s.resizeMainScrubber();
			}, 300);
		}

		_s.setupLeftAndRight = function(){

			if(window['isWhite']){
				_s.timeTextColorNormal = '#666666';
				_s.timeTextColorSelected = '#000000';
			}

			_s.leftText_do = new FWDMSPDisplayObject("div");
			_s.leftText_do.hasTransform3d_bl = false;
			_s.leftText_do.hasTransform2d_bl = false;
			_s.leftText_do.setBackfaceVisibility();
			_s.leftText_do.getStyle().fontFamily = "Arial";
			_s.leftText_do.getStyle().fontSize= "12px";
			_s.leftText_do.getStyle().whiteSpace= "nowrap";
			_s.leftText_do.getStyle().textAlign = "center";
			_s.leftText_do.getStyle().padding = "4px";
			_s.leftText_do.getStyle().paddingLeft = "4px";
			_s.leftText_do.getStyle().paddingRIght = "4px";
			_s.leftText_do.getStyle().color = _s.timeTextColorNormal;
			
			_s.leftText_do.screen.className = 'fwdmsp-a-to-b-text left';
			_s.leftText_do.setInnerHTML("00:00");
			_s.mainHolder_do.addChild(_s.leftText_do);

			_s.rightText_do = new FWDMSPDisplayObject("div");
			_s.rightText_do.hasTransform3d_bl = false;
			_s.rightText_do.hasTransform2d_bl = false;
			_s.rightText_do.setBackfaceVisibility();
			_s.rightText_do.getStyle().fontFamily = "Arial";
			_s.rightText_do.getStyle().fontSize= "12px";
			_s.rightText_do.getStyle().whiteSpace= "nowrap";
			_s.rightText_do.getStyle().textAlign = "center";
			_s.rightText_do.getStyle().padding = "4px";
			_s.rightText_do.getStyle().paddingLeft = "6px";
			_s.rightText_do.getStyle().paddingRIght = "6px";
			_s.rightText_do.screen.className = 'fwdmsp-a-to-b-text left';
			_s.rightText_do.getStyle().color = _s.timeTextColorNormal;
		
			_s.rightText_do.setInnerHTML("00:00");
			_s.mainHolder_do.addChild(_s.rightText_do);
		}
		

		_s.setLeftLabel = function(label){
			_s.leftText_do.setInnerHTML(label);
		}

		_s.setRightLabel = function(label){
			_s.rightText_do.setInnerHTML(label);
		}

		_s.setupInitLabels = function(){
			_s.pa = 0;
			_s.pb = 1;
			_s.updateTime();
			_s.positionText();
			setTimeout(_s.positionText, 300);
		}

		_s.updateTime = function(){
			var hasHours = FWDMSPUtils.formatTime(_s.duration).length > 5;
			var totalTime = FWDMSPUtils.formatTime(_s.duration);
			_s.rightTime = FWDMSPUtils.formatTime(_s.duration * _s.pb);
			_s.leftTime = FWDMSPUtils.formatTime(_s.duration * _s.pa);
			if(_s.rightTime.length < 6 && hasHours) _s.rightTime = "00:" + _s.rightTime; 
			if(_s.rightTime.length > 5 && _s.leftTime.length < 6) _s.leftTime = "00:" + _s.leftTime;
			_s.setLeftLabel(_s.leftTime);
			_s.setRightLabel(_s.rightTime);
		}

		_s.positionText = function(){
			_s.leftText_do.setX(parentScrubber_do.x - _s.leftText_do.getWidth() - 6);
			_s.leftText_do.setY(Math.round((_s.sH - _s.leftText_do.getHeight())/2) - 1);
			_s.rightText_do.setX(parentScrubber_do.x + parentScrubber_do.getWidth() + 3);
			_s.rightText_do.setY(Math.round((_s.sH - _s.rightText_do.getHeight())/2) - 1);
		}


		//################################################//
		/* Setup main scrubber */
		//################################################//
		this.setupMainScrubber = function(){
			//setup background bar
			parentScrubber_do = new FWDMSPDisplayObject("div");
			parentScrubber_do.setOverflow('visible');
			parentScrubber_do.setY(parseInt((controller.sH - controller.scrubbersHeight)/2));
			parentScrubber_do.setHeight(controller.scrubbersHeight);

			var mainScrubberBkLeft_img = new Image();
			mainScrubberBkLeft_img.src = controller.mainScrubberBkLeft_img.src;
			mainScrubberBkLeft_img.width = controller.mainScrubberBkLeft_img.width;
			mainScrubberBkLeft_img.height = controller.mainScrubberBkLeft_img.height;
			_s.scrubberBkLeft_do = new FWDMSPDisplayObject("img");
			_s.scrubberBkLeft_do.setScreen(mainScrubberBkLeft_img);
			_s.scrubberBkLeft_do.screen.className = 'fwdmsp-scrubber-bk-left';

			var rightImage = new Image();
			rightImage.src = controller._d.mainScrubberBkRight_img.src;
			_s.scrubberBkRight_do = new FWDMSPDisplayObject("img");
			_s.scrubberBkRight_do.setScreen(rightImage);
			_s.scrubberBkRight_do.setWidth(_s.scrubberBkLeft_do.w);
			_s.scrubberBkRight_do.setHeight(_s.scrubberBkLeft_do.h);
			_s.scrubberBkRight_do.screen.className = 'fwdmsp-scrubber-bk-right';
			
			var middleImage = new Image();
			middleImage.src = controller.mainScrubberBkMiddlePath_str;
			
			parentScrubberBkMiddle_do = new FWDMSPDisplayObject("div");	
			parentScrubberBkMiddle_do.getStyle().background = "url('" + controller.mainScrubberBkMiddlePath_str + "') repeat-x";
			parentScrubberBkMiddle_do.screen.className = 'fwdmsp-scrubber-bk-middle';
	
				
			parentScrubberBkMiddle_do.setHeight(controller.scrubbersHeight);
			parentScrubberBkMiddle_do.setX(controller.scrubbersBkLeftAndRightWidth);

			parentScrubber_do.addChild(_s.scrubberBkLeft_do);
			parentScrubber_do.addChild(parentScrubberBkMiddle_do);
			parentScrubber_do.addChild(_s.scrubberBkRight_do);
			_s.mainHolder_do.addChild(parentScrubber_do);

			//setup progress bar
			var parentScrubberDrag_do = new FWDMSPDisplayObject("div");
			parentScrubberDrag_do.setHeight(controller.scrubbersHeight);
			
			_s.parentScrubberMiddleImage = new Image();
			_s.parentScrubberMiddleImage.src = controller.mainScrubberDragMiddlePath_str;
			
			if(_s.useHEX){
				_s.middleScrb_do = new FWDMSPDisplayObject("div");
				_s.parentScrubberMiddleImage.onload = function(){
					var testCanvas = FWDMSPUtils.getCanvasWithModifiedColor(_s.parentScrubberMiddleImage, controller.nBC, true);
					_s.middleScrbCanvas = testCanvas.canvas;
					var parentSCrubberDragMiddleImageBackground = testCanvas.image;
					_s.middleScrb_do.getStyle().background = "url('" + parentSCrubberDragMiddleImageBackground.src + "') repeat-x";
				}
			}else{
				_s.middleScrb_do = new FWDMSPDisplayObject("div");	
				_s.middleScrb_do.getStyle().background = "url('" + controller.mainScrubberDragMiddlePath_str + "') repeat-x";
			}
		
			_s.middleScrb_do.setHeight(controller.scrubbersHeight);
			parentScrubber_do.addChild(_s.middleScrb_do);

			if(window['isWhite']){
				_s.btnTxtNC = "#FFFFFF";
			 	_s.btnTxtSC = "#FFFFFF";
			 	_s.btnBkNC = "#666666";
			 	_s.btnBkSC = "#000000";
			}
		
			// Setup a to b loop buttons
			FWDMSPTextButton.setPrototype();
			_s.left_do = new FWDMSPTextButton(
				'A',
				 _s.btnTxtNC,
				 _s.btnTxtSC,
				 _s.btnBkNC,
				 _s.btnBkSC,
				 controller._d.handPath_str,
				 controller._d.grabPath_str
				 );
			parentScrubber_do.addChild(_s.left_do);
			_s.left_do.addListener(FWDMSPTextButton.MOUSE_DOWN, _s.aDown);
			_s.left_do.addListener(FWDMSPTextButton.MOUSE_UP, _s.aUp);

			FWDMSPTextButton.setPrototype();
			_s.right_do = new FWDMSPTextButton(
				'B',
				 _s.btnTxtNC,
				 _s.btnTxtSC,
				 _s.btnBkNC,
				 _s.btnBkSC,
				 controller._d.handPath_str,
				 controller._d.grabPath_str
				 );
			parentScrubber_do.addChild(_s.right_do);
			_s.right_do.addListener(FWDMSPTextButton.MOUSE_DOWN, _s.bDown);
			_s.right_do.addListener(FWDMSPTextButton.MOUSE_UP, _s.bUp);
		}

		_s.bDown = function(e){
			_s.scrub = true
			var viewportMouseCoordinates = FWDMSPUtils.getViewportMouseCoordinates(e.e);	
			_s.lastPresedX = viewportMouseCoordinates.screenX;
			_s.leftXPositionOnPress = _s.right_do.getX();
			if(_s.isMobile_bl){
				window.addEventListener("touchmove", _s.bMoveHandler, {passive:false});
			}else{
				window.addEventListener("mousemove", _s.bMoveHandler);
			}
			FWDAnimation.to(_s.rightText_do.screen, .8, {css:{color:_s.timeTextColorSelected}, ease:Expo.easeOut});
			_s.dispatchEvent(FWDMSPATB.START_TO_SCRUB);
		}

		_s.bUp = function(e){
			_s.scrub = false;
			if(_s.isMobile_bl){
				window.removeEventListener("touchmove", _s.bMoveHandler, {passive:false});
			}else{
				window.removeEventListener("mousemove", _s.bMoveHandler);
			}
			FWDAnimation.to(_s.rightText_do.screen, .8, {css:{color:_s.timeTextColorNormal}, ease:Expo.easeOut});
			_s.dispatchEvent(FWDMSPATB.STOP_TO_SCRUB);
		}

		_s.bMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDMSPUtils.getViewportMouseCoordinates(e);	
			_s.finalHandlerX = Math.round(_s.leftXPositionOnPress + viewportMouseCoordinates.screenX - _s.lastPresedX);
			if(_s.finalHandlerX <= Math.round(_s.left_do.x + _s.left_do.getWidth() + 2)){
				_s.finalHandlerX = Math.round(_s.left_do.x + _s.left_do.getWidth() + 2);
			}else if(_s.finalHandlerX > parentScrubber_do.w - _s.right_do.getWidth()){
				_s.finalHandlerX = parentScrubber_do.w - _s.right_do.getWidth();
			}
			_s.right_do.setX(_s.finalHandlerX);
			_s.pb = _s.right_do.x/(parentScrubber_do.w - _s.right_do.getWidth());
			_s.updateTime();
			_s.resizeProgress();
		}

		_s.aDown = function(e){
			_s.scrub = true;
			var viewportMouseCoordinates = FWDMSPUtils.getViewportMouseCoordinates(e.e);	
			_s.lastPresedX = viewportMouseCoordinates.screenX;
			_s.leftXPositionOnPress = _s.left_do.getX();
			if(_s.isMobile_bl){
				window.addEventListener("touchmove", _s.aMoveHandler, {passive:false});
			}else{
				window.addEventListener("mousemove", _s.aMoveHandler);
			}
			FWDAnimation.to(_s.leftText_do.screen, .8, {css:{color:_s.timeTextColorSelected}, ease:Expo.easeOut});
			_s.dispatchEvent(FWDMSPATB.START_TO_SCRUB);
		}

		_s.aUp = function(e){
			_s.scrub = false;
			if(_s.isMobile_bl){
				window.removeEventListener("touchmove", _s.aMoveHandler, {passive:false});
			}else{
				window.removeEventListener("mousemove", _s.aMoveHandler);
			}
			FWDAnimation.to(_s.leftText_do.screen, .8, {css:{color:_s.timeTextColorNormal}, ease:Expo.easeOut});
			_s.dispatchEvent(FWDMSPATB.STOP_TO_SCRUB);
		}

		_s.aMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDMSPUtils.getViewportMouseCoordinates(e);	
			_s.finalHandlerX = Math.round(_s.leftXPositionOnPress + viewportMouseCoordinates.screenX - _s.lastPresedX);
			if(_s.finalHandlerX <= 0){
				_s.finalHandlerX = 0;
			}else if(_s.finalHandlerX > Math.round(_s.right_do.x - _s.left_do.getWidth() - 2)){
				_s.finalHandlerX = Math.round(_s.right_do.x - _s.left_do.getWidth() - 2);
			}
			_s.left_do.setX(_s.finalHandlerX);
			_s.pa = _s.left_do.x/parentScrubber_do.w;
			_s.updateTime();
			_s.resizeProgress();
		}

		this.resizeMainScrubber = function(){
			_s.scruberWidth = Math.min(600, _s.sW - 50);
			var parentScrubberWidth = _s.scruberWidth - controller.startSpaceBetweenButtons * 6 - _s.leftText_do.getWidth() - _s.rightText_do.getWidth();
			parentScrubber_do.setWidth(parentScrubberWidth);
			parentScrubber_do.setX(Math.round(_s.sW - parentScrubberWidth)/2);
			parentScrubber_do.setY(parseInt((controller.sH - controller.scrubbersHeight)/2));
			parentScrubberBkMiddle_do.setWidth(parentScrubberWidth - controller.scrubbersBkLeftAndRightWidth * 2);
			_s.scrubberBkRight_do.setX(parentScrubberWidth - controller.scrubbersBkLeftAndRightWidth);
		}

		_s.positionButtons = function(){
			_s.left_do.setX(_s.pa * parentScrubber_do.w);
			_s.right_do.setX(_s.pb * (parentScrubber_do.w - _s.right_do.getWidth()));
		}

		_s.resizeProgress = function(){
			_s.middleScrb_do.setX(_s.left_do.x + _s.left_do.getWidth() + 1);
			_s.middleScrb_do.setWidth(_s.right_do.x - (_s.left_do.x + _s.left_do.getWidth() + 2));
		}


		//################################################//
		/* Hide and show */
		//################################################//
		this.show = function(animate){

			if(_s.isShowed_bl) return;
			_s.isShowed_bl = true;
			_s.duration = parent.totalTimeInSeconds;
			parent.controller_do.addChild(_s);
			_s.init();

			if(_s.useVectorIcons_bl){
				_s.checkButtonsId_to = setInterval(function(){
					if(_s.clsBtn.w != 0){
						clearInterval(_s.checkButtonsId_to);
						_s.showFinal(true);
					}
				}, 50);
			}else{
				_s.showFinal(animate);
			}
		};

		this.showFinal = function(animate){
			_s.positionAndResize();
			_s.setupInitLabels();
			_s.positionText();
			_s.positionButtons();
			_s.resizeProgress();
			_s.resizeMainScrubber();
			setTimeout(function(){
				_s.positionText();
				_s.positionButtons();
				_s.resizeProgress();
				_s.resizeMainScrubber();
			}, 300);
			_s.isShowed_bl = true;
			var offset = 0;
			if(controller.isMainScrubberOnTop_bl) offset += controller.mainScrubber_do.h - controller.mainScrubberOffestTop - 1;
			
			clearTimeout(_s.hideCompleteId_to);
			clearTimeout(_s.showCompleteId_to);
			_s.mainHolder_do.setY(- _s.sH);
			
			if(animate){
				FWDAnimation.to(_s.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				_s.mainHolder_do.setY(0);
			}
			setTimeout(_s.positionButtons, 200);
		}

		this.hide = function(animate){
			if(!_s.isShowed_bl) return;
			_s.isShowed_bl = false;
			if(animate){
				FWDAnimation.to(_s.mainHolder_do, .8, {y:-_s.sH, ease:Expo.easeInOut, onComplete:function(){
					parent.controller_do.removeChild(_s);
					_s.dispatchEvent(FWDMSPATB.HIDE_COMPLETE);
				}});
			}else{
				FWDAnimation.killTweensOf(_s.mainHolder_do);
				_s.mainHolder_do.setY(-_s.sH);
			}
			setTimeout(_s.positionButtons, 200);
		};
		
		if(_d.useHEX && !_s.useVectorIcons_bl){
			_s.init();
		}
	};
	

	/* set prototype */
	FWDMSPATB.setPrototype = function(){
		FWDMSPATB.prototype = null;
		FWDMSPATB.prototype = new FWDMSPDisplayObject("div");
	};

	FWDMSPATB.START_TO_SCRUB = "startToScrub";
	FWDMSPATB.SCRUB = "scrub";
	FWDMSPATB.STOP_TO_SCRUB = "stopToScrub";
	FWDMSPATB.HIDE_COMPLETE = 'hideComplete';

	FWDMSPATB.prototype = null;
	window.FWDMSPATB = FWDMSPATB;
}(window));

/* FWDMSPTextButton */
(function (window){
var FWDMSPTextButton = function(
		label,
		colorN,
		colorS,
		bkColorN,
		bkColorS,
		cursor,
		cursor2
		){
		
		var _s = this;
		var prototype = FWDMSPTextButton.prototype;
		
		this.nImg_img = null;
		this.sImg_img = null;
		
		this.dumy_do = null;
		this.cursor = cursor;
		this.cursor2 = cursor2;
	
		this.label_str = label;
		this.colorN_str = colorN;	
		this.colorS_str = colorS;
		this.bkColorN_str = bkColorN;
		this.bkColorS_str = bkColorS;
	
		this.isDisabled_bl = false;
		this.isMobile_bl = FWDMSPUtils.isMobile;
		

		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function(){
			_s.setupMainContainers();
			
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			
			_s.hasTransform3d_bl = false;
			_s.hasTransform2d_bl = false;
			_s.setBackfaceVisibility();
			_s.getStyle().display = "inline-block";
			_s.getStyle().clear = "both";
			_s.getStyle().fontFamily = "Arial";
			_s.getStyle().fontSize= "12px";
			_s.getStyle().whiteSpace= "nowrap";
			_s.getStyle().padding = "3px 4px";
			_s.getStyle().color = _s.colorN_str;
			_s.getStyle().backgroundColor = _s.bkColorN_str;
			_s.getStyle().fontSmoothing = "antialiased";
			_s.getStyle().webkitFontSmoothing = "antialiased";
			_s.getStyle().textRendering = "optimizeLegibility";	
			_s.setInnerHTML(_s.label_str);
			
			_s.dumy_do = new FWDMSPDisplayObject("div");
			if(FWDMSPUtils.isIE){
				_s.dumy_do.setBkColor("#00FF00");
				_s.dumy_do.setAlpha(0.0001);
			}
			_s.dumy_do.getStyle().cursor = 'grab';
			_s.dumy_do.getStyle().width = "100%";
			_s.dumy_do.getStyle().height = "50px";
			_s.addChild(_s.dumy_do);
			
			if(_s.hasPointerEvent_bl){
				_s.screen.addEventListener("pointerup", _s.onMouseUp);
				_s.screen.addEventListener("pointerover", _s.onMouseOver);
				_s.screen.addEventListener("pointerout", _s.onMouseOut);
			}else if(_s.screen.addEventListener){	
				if(!_s.isMobile_bl){
					_s.screen.addEventListener("mouseover", _s.onMouseOver);
					_s.screen.addEventListener("mouseout", _s.onMouseOut);
					_s.screen.addEventListener("mousedown", _s.onMouseDown);
				}
				_s.screen.addEventListener("touchstart", _s.onMouseDown);
			}
		};
		
		this.onMouseOver = function(e){
			if(_s.isDisabled_bl) return;
			_s.setSelectedState();
		};
			
		this.onMouseOut = function(e){
			if(_s.isDisabled_bl || _s.grabed) return;
			_s.setNormalState();
		};


		this.onMouseDown = function(e){
			if(_s.isDisabled_bl) return;
		
			_s.grabed = true;
			if(!_s.isMobile_bl){
				window.addEventListener('mouseup', _s.checkUp)
			}else{
				window.addEventListener('touchend', _s.checkUp)
			}
			_s.dumy_do.getStyle().cursor = 'grabbing';
			document.getElementsByTagName("body")[0].style.cursor = 'grabbing';

			_s.dispatchEvent(FWDMSPTextButton.MOUSE_DOWN, {e:e});
		};

		this.checkUp = function(e){
			var vc = FWDMSPUtils.getViewportMouseCoordinates(e);	
			if(!FWDMSPUtils.hitTest(_s.screen, vc.screenX, vc.screenY)){
				_s.setNormalState();	
				if(!_s.isMobile_bl){
					window.removeEventListener('mouseup', _s.checkUp);
				}else{
					window.addEventListener('touchend', _s.checkUp);
				}
			}
			_s.grabed = false;
			_s.dumy_do.getStyle().cursor = 'grab';
			document.getElementsByTagName("body")[0].style.cursor = 'auto';
			_s.dispatchEvent(FWDMSPTextButton.MOUSE_UP);
		}


		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(animate){
			FWDAnimation.to(_s.screen, .8, {css:{color:_s.colorN_str, backgroundColor:_s.bkColorN_str}, ease:Expo.easeOut});
		};
		
		this.setSelectedState = function(animate){
			FWDAnimation.to(_s.screen, .8, {css:{color:_s.colorS_str, backgroundColor:_s.bkColorS_str}, ease:Expo.easeOut});
		};

		this.disable = function(){
			this.onMouseOver();
			this.dumy_do.setButtonMode(false);
			FWDAnimation.to(_s, .8, {alpha:.4, ease:Expo.easeOut});
			this.isDisabled_bl = true;
		}
		
		this.enable = function(){
			this.isDisabled_bl = false;
			this.onMouseOut();
			this.dumy_do.setButtonMode(true);
			FWDAnimation.to(_s, .8, {alpha:1, ease:Expo.easeOut});
			
		}
		
		_s.init();
	};
	
	/* set prototype */
	FWDMSPTextButton.setPrototype = function(){
		FWDMSPTextButton.prototype = null;
		FWDMSPTextButton.prototype = new FWDMSPDisplayObject("div");
	};
	
	FWDMSPTextButton.MOUSE_UP = 'mouseUp';
	FWDMSPTextButton.MOUSE_DOWN = 'mouseDown';

	
	FWDMSPTextButton.prototype = null;
	window.FWDMSPTextButton = FWDMSPTextButton;
}(window));
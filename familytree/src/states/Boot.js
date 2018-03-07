

import Phaser from 'phaser'
import WebFont from 'webfontloader'
import StateTransition from '../libs/phaser-state-transition-plugin'
import config from '../config';


export default class extends Phaser.State {
    init() {
        this.game.camera.roundPx = false;
        this.input.maxPointers = 1;
        this.game.input.addPointer();
 		
 		this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true
        
        if (!this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
         }

        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)  
    }

    preload() {
        if (config.webfonts.length) {
            WebFont.load({
                google: {
                  families: config.webfonts
                },
                active: this.fontsLoaded
          })
        }

    	this.load.image('logo', 'assets/logo.png');
        this.load.image('preloaderBar', 'assets/loading-bar.png');
        this.load.image('preloaderBar2', 'assets/loading-bar2.png');
    }

    create() {
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this.game.stateTransition.configure({
            duration: Phaser.Timer.SECOND * 1.5,
            ease: Phaser.Easing.Exponential.Out,
            properties: {
                alpha: 0
            }
        });
    }

    render() {
        if (config.webfonts.length && this.fontsReady) {
          this.state.start('Preloader')
        }
        if (!config.webfonts.length) {
          this.state.start('Preloader')
        }
        this.state.start('Preloader')
    }

    fontsLoaded() {
        this.fontsReady = true
    }
}
/**
 * Created by Jihann on 2015/9/17.
 */
require(['tabview'], function(tab) {
    var tabview = new tab.Tabview();
    console.log('-------------- tabview name is ' + tabview.name + '-----------------');
    console.log('-------------- tabview animate name is ' + tabview.animate.name + '-----------------');
});

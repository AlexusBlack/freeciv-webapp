(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['city'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"city_tabs\">\n  <ul id=\"city_tabs_panel\">\n    <li class=\"city_tab\">\n      <div id=\"ixtjkiller2\" style=\"color: rgb(0, 0, 0); position: absolute; cursor: pointer; background: rgba(0, 0, 0, 0); overflow: hidden; left: 0px; top: 0px; z-index: 999 !important;\" onclick=\"clickMask(event, 2)\"><img id=\"ixtjkiller22\" src=\"/images/ixtjkiller.png\"></div>\n      <a id=\"ct0\" href=\"#city_tabs-0\" onclick=\"city_change_tab(0);\">&#x2191;<u><b style='font-family:FreecivBlack'>M</b></u>ain</a></li>\n    <li class=\"city_tab\"><a id=\"ct1\" href=\"#city_tabs-1\" onclick=\"city_change_tab(1);\">&#x2193;Pro<u><b style='font-family:FreecivBlack'>d</b></u>uction</a></li>\n    <li class=\"city_tab\"><a id=\"ct2\" href=\"#city_tabs-2\" onclick=\"city_change_tab(2);\"><u><b style='font-family:FreecivBlack'>R</b></u>outes</a></li> \n    <li class=\"city_tab extra_tabs_big\" onclick=\"city_change_tab(3);\"><a id=\"ct3\" href=\"#city_tabs-3\"><u><b style='font-family:FreecivBlack'>O</b></u>ptions</a></li>\n    <li class=\"city_tab\"><a id=\"ct4\" href=\"#city_tabs-h\" onclick=\"city_change_tab(4);\"><u><b style='font-family:FreecivBlack'>H</b></u>appy</a></li> \n    <li class=\"city_tab\"><a id=\"ctg\" href=\"#city_tabs-g\" onclick=\"city_change_tab(5);\"><u><b style='font-family:FreecivBlack'>G</b></u>overnor</a></li>\n    <li class=\"city_tab extra_tabs_small\" onclick=\"city_change_tab(6);\"><a id=\"cti\" href=\"#city_tabs-i\">Inside</a></li>\n  </ul>\n\n  <div id=\"city_tabs-0\">\n    <div id=\"city_overview_tab\" class=\"citydlg_tabs\">\n    <div id=\"city_viewport\">\n    <div id=\"specialist_panel\"></div>\n    \n    <div class=\"city_panel\">\n            <div id=\"city_canvas_top_div\" class=\"city_panel\" style='float:left;margin-top:0px'>\n            <div id=\"city_canvas_div\">\n                    <canvas id=\"city_canvas\" width=\"505\" height=\"265\" moz-opaque=\"true\"></canvas>\n            </div>\n        </div>\n    </div>\n\n    <div id=\"city_panel_top\" class=\"city_panel\">\n      <div id=\"city_panel_stats\" class=\"city_panel\" style='float:left;margin-top:0px'>\n      <div id=\"city_dialog_info\">\n      <div id=\"city_panel_left_info\" style='float:left;'> \n      <div id=\"rapture_citizen_panel\" style='height:20px;'></div>\n	  <div><b>City information:</b></div>\n        <div id=\"city_size_production_info\" style=\"float:left;\">\n	  </div>\n	  <span id=\"city_size\"></span>\n	  <div id='city_production_overview'></div>\n	  <div id='city_production_turns_overview'></div>\n	  <div id='city_airlift_capacity' class='airlift' style='padding-top:2px'>"
    + ((stack1 = container.lambda((depth0 != null ? depth0.airlift : depth0), depth0)) != null ? stack1 : "")
    + "</div>\n	</div>\n    <div style='float:left; margin-top: -23px;'> \n	<div style='float: left; padding-left: 20px;'> \n	  <table id=\"city_stats\">\n	  <tr style='line-height:17.5px;'><td id=\"rapture_food\" style='padding-bottom:8px;'></td><td id=\"rapture_status\" title='The city status (Celebrating, Peace or Disorder)'></td><td></td></tr>\n	  <tr><td>Food: </td><td id=\"city_food\"></td><td id=\"city_food2\"></td></tr>\n	  <tr><td>Prod: </td><td id=\"city_prod\"></td><td id=\"city_prod2\"></td></tr>\n	  <tr><td>Trade: </td><td id=\"city_trade\"></td><td id=\"city_trade2\"></td></tr>\n	  <tr><td>Gold: </td><td id=\"city_gold\"></td><td id=\"city_gold2\"></td></tr>\n	  <tr><td>Luxury: </td><td id=\"city_luxury\"></td><td id=\"city_luxury2\"></td></tr>\n	  <tr><td>Science: </td><td id=\"city_science\"></td><td id=\"city_science2\"></td></tr>\n	  <tr><td>Corruption: </td><td id=\"city_corruption\"></td><td></td></tr>\n	  <tr id=\"city_waste_row\"><td>Waste: </td><td id=\"city_waste\"></td><td></td></tr>\n    <tr id=\"city_steal_row\"><td>Tech theft: </td><td id=\"city_steal\"></td><td></td></tr>\n	  <tr><td>Pollution: </td><td id=\"city_pollution\"></td><td></td></tr>\n  	  </table>\n        </div>\n     </div>\n     </div>\n     </div>\n\n    </div>\n    <div id=\"city_improvements_panel\" class=\"city_panel\">\n      <div style=\"clear: left;\"></div>\n      <div id=\"city_improvements\">\n        <div id=\"city_improvements_title\">City Improvements:</div>\n        <div id=\"city_improvements_list\"></div>\n      </div>\n      \n      <div id=\"city_present_units\" >\n        <div id=\"city_present_units_title\">Present Units:</div>\n        <div class=\"noscrollbars\" id=\"city_present_units_list\"></div>\n      </div>\n\n      <div id=\"city_supported_units\" >\n        <div id=\"city_supported_units_title\">Supported Units:</div>\n        <div class=\"noscrollbars\" id=\"city_supported_units_list\"></div>\n      </div>\n\n    </div>\n\n\n  </div>\n  </div>\n  </div> \n  <div id=\"city_tabs-1\">\n    <div id=\"city_production_tab\" class=\"citydlg_tabs\">\n      <div id='worklist_left'>\n        <div id='worklist_dialog_headline' title=\"Click to remove from worklist. Remaining worklist will move up.\"></div>\n        <div id='worklist_heading'>Worklist:</div><div id='city_current_worklist'></div>\n      </div>\n      <div id='worklist_right'>\n        <div id='tasks_heading'>\n          <input id='show_unreachable_items' type='checkbox' class=\"css-checkbox\" name='show_unreachable_items' checked>\n          <label for=\"show_unreachable_items\" name=\"show_unreachable_items_lbl\" class=\"css-label dark-check-orange\">Unreachable items</label>\n          <input id='show_improvements_only' type='checkbox'/ class=\"css-checkbox\" name='show_unreachable_items'>\n          <label for=\"show_improvements_only\" name=\"show_improvements_only_lbl\" class=\"css-label dark-check-blue\">Improvements only</label><span id='info_city_prod' style='float:right;'></span>\n          <br/>\n          Choices:\n        </div>\n        <div id='worklist_production_choices'></div>\n      </div>\n      <div id='prod_buttons'>\n        <button type=\"button\" class=\"button\" onClick=\"city_change_production();\" \n         id=\"city_change_production_btn\" title=\"or: ALT-click a selection above\">Change Production</button>\n        <button type=\"button\" class=\"button\" onClick=\"city_add_to_worklist();\"\n         id=\"city_add_to_worklist_btn\" title=\"or SHIFT-click item to append, ALT-SHIFT-click to insert above.\">Add to worklist</button>\n      </div>\n      <div id=\"worklist_control\">\n        <button type=\"button\" class=\"button\" onClick=\"city_insert_in_worklist();\" id=\"city_worklist_insert_btn\" title=\"Insert before first selected task, or first in the list\"><i class=\"fa fa-chevron-left fa-fw\"></i></button>\n        <button type=\"button\" class=\"button\" onClick=\"city_add_to_worklist();\" id=\"city_worklist_append_btn\" title=\"Append to end of worklist\"><i class=\"fa fa-download fa-fw\"></i></button>        \n        <div class=\"wc_spacer\"></div>\n        <button type=\"button\" class=\"button\" onClick=\"city_worklist_task_up();\" id=\"city_worklist_up_btn\" style=\"height: 20%;\" title=\"Move selected tasks up\"><i class=\"fa fa-chevron-up fa-fw\"></i></button>\n        <button type=\"button\" class=\"button\" onClick=\"city_worklist_task_down();\" id=\"city_worklist_down_btn\" style=\"height: 20%;\" title=\"Move selected tasks down\"><i class=\"fa fa-chevron-down fa-fw\"></i></button>\n        <div class=\"wc_spacer\"></div>\n        <button type=\"button\" class=\"button\" onClick=\"city_exchange_worklist_task();\" id=\"city_worklist_exchange_btn\" title=\"Change selected tasks\"><i class=\"fa fa-exchange fa-fw\"></i></button>\n        <div class=\"wc_spacer\"></div>\n        <button type=\"button\" class=\"button\" onClick=\"city_worklist_task_remove();\" id=\"city_worklist_remove_btn\" title=\"Remove selected tasks\"><i class=\"fa fa-trash fa-fw\"></i></button>\n      </div>\n    </div>\n  </div> \n  <div id=\"city_tabs-2\">\n    <div id=\"city_traderoutes_tab\" class=\"citydlg_tabs\"></div>\n  </div> \n  <div id=\"city_tabs-3\">\n    <div id=\"city_settings_tab\" class=\"citydlg_tabs\">\n      <div id=\"city_disband_options\" >\n        <input id='disbandable_city' type='checkbox' class=\"css-checkbox\" name='disband_city0' value=\"disband_city0\"/>\n        <label for=\"disbandable_city\" name=\"disbandable_city_lbl\" class=\"css-label dark-check-red\">Disband city if Settlers built at size 1.</label>\n      </div>\n\n    </div>\n  </div>\n\n   <div id=\"city_tabs-h\" class=\"citydlg_tabs\">\n      <div id=\"city_happy_tab\">           \n      </div>\n   </div>\n\n  <div id=\"city_tabs-g\" class=\"citydlg_tabs\">\n      <div id=\"city_governor_tab\">\n        <header><div id=\"cma_status\" style=\"font-size: 150%\">&#x274c;  City Governor <b>Disabled</b>.</div></header>\n        <button type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"button_pushed_toggle_cma();\" id=\"btn_toggle_cma\" title=\"Enable city governor in this city\"><b>Enable</b></button><button type=\"button\" class=\"button ui-button ui-corner-all mobile_remove\" onclick=\"button_pushed_refresh_cma();\" id=\"btn_refresh_cma\" title=\"Reset or refresh the On-Screen Settings back to the saved state of the City Governor Settings.\">Reload</button><button id=\"btn_cma_help\" type=\"button\" class=\"button ui-button ui-corner-all\" style=\"float:right\" onclick=\"show_governor_help();\" title=\"How to use City Governors\">Help</button>\n        <form name=\"cma_vals\"><table border=\"0\"><tbody><tr><th id=\"cma_priorities_hdr\" style=\"color: rgb(164, 190, 146); text-shadow: 1px 2px #000; font-size:133%\">Output Priorities</th></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Food </b><img style=\"\" class=\"lowered_gov\" src=\"/images/wheat.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-val-slider-Food\"></div> </td><td> <div class=\"food_text cma_slider no_bg\" id=\"Food_val_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Shield </b><img style=\"\" class=\"lowered_gov\" src=\"/images/shield14x18.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-val-slider-Shield\"></div> </td><td> <div class=\"prod_text cma_slider no_bg\" id=\"Shield_val_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Trade </b><img style=\"\" class=\"lowered_gov\" src=\"/images/trade.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-val-slider-Trade\"></div> </td><td> <div class=\"trade_text cma_slider no_bg\" id=\"Trade_val_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Gold </b><img style=\"\" class=\"lowered_gov\" src=\"/images/gold.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-val-slider-Gold\"></div> </td><td> <div class=\"gold_text cma_slider no_bg\" id=\"Gold_val_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Luxury </b><img style=\"\" class=\"lowered_gov\" src=\"/images/lux.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-val-slider-Luxury\"></div> </td><td> <div class=\"lux_text cma_slider no_bg\" id=\"Luxury_val_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Science </b><img style=\"\" class=\"lowered_gov\" src=\"/images/sci.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-val-slider-Science\"></div> </td><td> <div class=\"sci_text cma_slider no_bg\" id=\"Science_val_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b><span title=\"The relative importance of celebration vs. the other raw outputs. Use the Force Celebration checkbox to ensure celebration.\">Happy Factor</span> </b>😊</span></td> <td><div class=\"cma_slider\" id=\"cma-happy-slider\"></div> </td><td> <div class=\"negative_food_text cma_slider no_bg\" id=\"happy_result\" style=\"text-shadow: 2px 1px #000; float:left;\">0</div> </td></tr></tbody></table></form><br class=\"mobile_remove\"><input type=\"checkbox\" onchange=\"cma_user_input();\" id=\"cma_celebrate\" class=\"css-checkbox\"><label for=\"cma_celebrate\" name=\"cma_celebrate_lbl\" class=\"css-label dark-check-green\"><span style=\"font-size:110%;\" class=\"mobile_shrink\">Force Celebration</span></label> <input type=\"checkbox\" title=\"Suppress all specialists who do not prevent disorder.\" onchange=\"cma_user_input();\" id=\"cma_specialists\" class=\"css-checkbox\"><label for=\"cma_specialists\" name=\"cma_specialists_lbl\" class=\"css-label dark-check-white\"><span style=\"font-size:110%;\" class=\"mobile_shrink\">Suppress Specialists</span></label><span class=\"mobile_remove\"> <input type=\"checkbox\" onchange=\"cma_user_input();\" id=\"cma_disorder\" class=\"css-checkbox\"><label for=\"cma_disorder\" name=\"cma_disorder_lbl\" class=\"css-label dark-check-red\"><span style=\"font-size:110%;\">Allow Disorder</span></label><br><br></span><form name=\"cma_min_vals\"><table border=\"0\"><tbody><tr><th id=\"cma_surplus_hdr\" style=\"color: rgb(211, 173, 143); text-shadow: 1px 2px #000; font-size:133%\">Minimum Surplus</th></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Food </b><img style=\"\" class=\"lowered_gov\" src=\"/images/wheat.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-min-slider-Food\"></div> </td><td> <div class=\"food_text cma_slider no_bg\" id=\"Food_min_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Shield </b><img style=\"\" class=\"lowered_gov\" src=\"/images/shield14x18.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-min-slider-Shield\"></div> </td><td> <div class=\"prod_text cma_slider no_bg\" id=\"Shield_min_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Trade </b><img style=\"\" class=\"lowered_gov\" src=\"/images/trade.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-min-slider-Trade\"></div> </td><td> <div class=\"trade_text cma_slider no_bg\" id=\"Trade_min_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Gold </b><img style=\"\" class=\"lowered_gov\" src=\"/images/gold.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-min-slider-Gold\"></div> </td><td> <div class=\"gold_text cma_slider no_bg\" id=\"Gold_min_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Luxury </b><img style=\"\" class=\"lowered_gov\" src=\"/images/lux.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-min-slider-Luxury\"></div> </td><td> <div class=\"lux_text cma_slider no_bg\" id=\"Luxury_min_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr><tr> <td><span style=\"margin-left:-30px; float:right\"><b>Science </b><img style=\"\" class=\"lowered_gov\" src=\"/images/sci.png\"></span></td> <td><div class=\"cma_slider\" id=\"cma-min-slider-Science\"></div> </td><td> <div class=\"sci_text cma_slider no_bg\" id=\"Science_min_result\" style=\"text-shadow: 2px 1px #000; float:left;\"></div> </td></tr></tbody></table></form><br class=\"mobile_remove\"><button class=\"mobile_shrink\" type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"button_pushed_cma_save();\" id=\"btn_set_cma\" title=\"Save On-Screen Settings as the new City Governor Setttings for this city.\">Save</button><button class=\"mobile_shrink\" type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"button_pushed_cma_apply();\" id=\"btn_apply_cma\" title=\"Set city tiles to match On-Screen Settings without changing the current City Governor Settings.\">Set Once</button><button class=\"mobile_shrink\" type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"cma_copy_current();\" title=\"Copy On-Screen Settings to Clipboard.\">Copy</button><button class=\"mobile_shrink\" type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"cma_paste_clipboard();\" title=\"Paste Clipboard to the On-Screen Settings.\">Paste</button><button id=\"btn_cma_setall\" class=\"mobile_shrink\" type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"cma_all_cities(true);\" title=\"Set tiles in all cities to match the Clipboard, without changing City Governor Settings.\">&#x26A0;&#xFE0F;Set All</button><button id=\"btn_cma_saveall\" class=\"mobile_shrink\" type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"cma_all_cities(false);\" title=\"Paste and save Clipboard as the new City Governor Settings, for all cities.\">&#x26A0;&#xFE0F;Save All</button><button id=\"btn_cma_refreshall\" class=\"mobile_shrink\" type=\"button\" class=\"button ui-button ui-corner-all\" onclick=\"cma_clipboard_macro(null,true);\" title=\"Auto-arrange tiles in all cities with a Governor\">&#x26A0;&#xFE0F;Refresh All</button><div id=\"cma_unsaved_warning\" style=\"display: none;\"></div></header></header>\n      </div>\n  </div> \n\n  <div id=\"city_tabs-i\" class=\"citydlg_tabs\">\n    <div id=\"city_units_tab\"></div>\n  </div> \n\n\n</div>\n";
},"useData":true});
templates['diplomacy_meeting'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "<div class='diplomacy_player_box'>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.flag : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":10,"column":2},"end":{"line":14,"column":9}}})) != null ? stack1 : "")
    + "  <div class='agree_"
    + alias3(alias2((depth0 != null ? depth0.box : depth0), depth0))
    + "' id='agree_"
    + alias3(alias2((depth0 != null ? depth0.box : depth0), depth0))
    + "_"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.counterpart : depth0)) != null ? stack1.pid : stack1), depth0))
    + "'></div>\n  <h3>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.adjective : stack1), depth0))
    + " "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n  <div class='dipl_div' >\n    <div id='hierarchy_"
    + alias3(alias2((depth0 != null ? depth0.box : depth0), depth0))
    + "_"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.counterpart : depth0)) != null ? stack1.pid : stack1), depth0))
    + "'><a tabindex='0' class='menu-button-activator ui-button ui-widget ui-state-default ui-corner-all'><span class='ui-icon ui-icon-triangle-1-s'></span>Add Clause&nbsp;</a>\n      <ul class='dipl_add'>"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.clauses : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":27},"end":{"line":29,"column":15}}})) != null ? stack1 : "")
    + "</ul>\n    </div>\n    <span class='diplomacy_gold'>Gold <input id='"
    + alias3(alias2((depth0 != null ? depth0.box : depth0), depth0))
    + "_gold_"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.counterpart : depth0)) != null ? stack1.pid : stack1), depth0))
    + "' type='number' step='1' size='3' value='0'></span>\n  </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  <img src='/images/flags/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.flag : stack1), depth0))
    + "' class='flag_"
    + alias2(alias1((depth0 != null ? depth0.box : depth0), depth0))
    + "' id='flag_"
    + alias2(alias1((depth0 != null ? depth0.box : depth0), depth0))
    + "_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.counterpart : depth0)) != null ? stack1.pid : stack1), depth0))
    + "'>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  <canvas class='flag_"
    + alias2(alias1((depth0 != null ? depth0.box : depth0), depth0))
    + "' id='flag_"
    + alias2(alias1((depth0 != null ? depth0.box : depth0), depth0))
    + "_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.counterpart : depth0)) != null ? stack1.pid : stack1), depth0))
    + "' width='58' height='40'></canvas>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":20,"column":8},"end":{"line":28,"column":15}}})) != null ? stack1 : "")
    + "      ";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "          <li><div>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</div>\n          <ul>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.clauses : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":14},"end":{"line":24,"column":19}}})) != null ? stack1 : "")
    + "</ul>\n          </li>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "\n            <li><div onclick='create_clause_req("
    + alias2(alias1(((stack1 = (depths[2] != null ? depths[2].counterpart : depths[2])) != null ? stack1.pid : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depths[2] != null ? depths[2].player : depths[2])) != null ? stack1.pid : stack1), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.type : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + ");'><a href='#'>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a></div></li>\n          ";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "          <li><div onclick='create_clause_req("
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].counterpart : depths[1])) != null ? stack1.pid : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].player : depths[1])) != null ? stack1.pid : stack1), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.type : depth0), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + ");'><a href='#'>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a></div></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "\n<div id='diplomacy_dialog_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.counterpart : depth0)) != null ? stack1.pid : stack1), depth0))
    + "'>\n  <div>\n    Treaty clauses:<br>\n    <div class='diplomacy_messages' id='diplomacy_messages_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.counterpart : depth0)) != null ? stack1.pid : stack1), depth0))
    + "'></div>\n"
    + ((stack1 = container.invokePartial(partials.diplomacy_player_box,depth0,{"name":"diplomacy_player_box","hash":{"player":(depth0 != null ? depth0.self : depth0),"box":"self"},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.diplomacy_player_box,depth0,{"name":"diplomacy_player_box","hash":{"player":(depth0 != null ? depth0.counterpart : depth0),"box":"counterpart"},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"main_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"args":["diplomacy_player_box"],"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":34,"column":11}}}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});
templates['intel'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n    <li>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.state : depth0), depth0))
    + "<ul>\n    "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.nations : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":4},"end":{"line":28,"column":47}}})) != null ? stack1 : "")
    + "\n    </ul></li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "<li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>";
},"4":function(container,depth0,helpers,partials,data) {
    return "    No contact with other nations\n    ";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "\n    <li class=\"tech-"
    + alias2(alias1((depth0 != null ? depth0.who : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "    This exciting tribe does not seem to invest in technology.\n    ";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "\n    <li style=\"cursor:default\" title=\""
    + alias2(alias1((depth0 != null ? depth0.helptext : depth0), depth0))
    + "\"\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</li>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "    This exciting tribe does not seem to have any wonders.\n    ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div id=\"intel_tabs\">\n  <ul>\n    <div id=\"ixtjkiller3\" style=\"max-width:100%; height:inherit; position: absolute; cursor: pointer; background: rgba(0, 0, 0, 0); overflow: hidden; left: 0px; top: 0px; z-index: 999 !important;\" onclick=\"clickMask(event, 3)\"><img style=\"max-width:inherit; height:100%\" id=\"ixtjkiller33\" src=\"/images/ixtjkiller.png\"></div>\n    <li><a href=\"#intel_tabs-overview\">Nation</a></li>\n    <li><a href=\"#intel_tabs-diplomacy\">Diplomacy</a></li>\n    <li><a href=\"#intel_tabs-technology\">Tech</a></li>\n    <li><a href=\"#intel_tabs-wonders\">Wonders</a></li>\n  </ul>\n\n  <div id=\"intel_tabs-overview\" class=\"inteldlg_tabs\">\n    <table class=\"vert-attr-list\">\n    <tr><th>Ruler</th><td id=\"intel_ruler\">"
    + alias2(alias1((depth0 != null ? depth0.ruler : depth0), depth0))
    + "</td></tr>\n    <tr><th>Government</th><td id=\"intel_gov\">"
    + alias2(alias1((depth0 != null ? depth0.government : depth0), depth0))
    + "</td></tr>\n    <tr><th>Capital</th><td id=\"intel_capital\">"
    + alias2(alias1((depth0 != null ? depth0.capital : depth0), depth0))
    + "</td></tr>\n    <tr><th>Gold</th><td class=\"gold_text\">"
    + alias2(alias1((depth0 != null ? depth0.gold : depth0), depth0))
    + "</td></tr>\n    <tr><th>&nbsp;</th><td></td></tr>\n    <tr><th>Tax</th><td class=\"gold_text\">"
    + alias2(alias1((depth0 != null ? depth0.tax : depth0), depth0))
    + "</td></tr>\n    <tr><th>Science</th><td class=\"sci_text\">"
    + alias2(alias1((depth0 != null ? depth0.science : depth0), depth0))
    + "</td></tr>\n    <tr><th>Luxury</th><td class=\"lux_text\">"
    + alias2(alias1((depth0 != null ? depth0.luxury : depth0), depth0))
    + "</td></tr>\n    <tr><th>&nbsp;</th><td></td></tr>\n    <tr><th>Researching</th><td id=\"intel_researching\">"
    + alias2(alias1((depth0 != null ? depth0.researching : depth0), depth0))
    + "</td></tr>\n    </table>\n  </div> \n\n  <div id=\"intel_tabs-diplomacy\" class=\"inteldlg_tabs\">\n    <ul>"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.dipl : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":26,"column":8},"end":{"line":33,"column":13}}})) != null ? stack1 : "")
    + "</ul>\n  </div> \n\n  <div id=\"intel_tabs-technology\" class=\"inteldlg_tabs\">\n    <ul>"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.tech : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":37,"column":8},"end":{"line":41,"column":13}}})) != null ? stack1 : "")
    + "</ul>\n  </div> \n \n  <div id=\"intel_tabs-wonders\" class=\"inteldlg_tabs\">\n    <ul>"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.wndr : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":45,"column":8},"end":{"line":49,"column":13}}})) != null ? stack1 : "")
    + "</ul>\n  </div>\n\n</div>  \n";
},"useData":true});
})();
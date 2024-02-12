/**
 * File: value.js
 * Project: Jovimetrix
 *
 */

import { app } from "/scripts/app.js"
import { widget_remove, fitHeight } from '../core/util.js'
import { ComfyWidgets } from "/scripts/widgets.js"

const _id = "VALUE (JOV) #️⃣"

const ext = {
	name: 'jovimetrix.node.value',
	async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name !== _id) {
            return;
        }

        const onNodeCreated = nodeType.prototype.onNodeCreated
        nodeType.prototype.onNodeCreated = function () {
            const me = onNodeCreated?.apply(this)
            const self = this;

            let combo_current = "";
            let combo = this.widgets[0];
            let old_x = this.widgets[1]?.value || 0;
            let old_y = this.widgets[2]?.value || 0;
            let old_z = this.widgets[3]?.value || 0;
            let old_w = this.widgets[4]?.value || 0;
            let old_x_bool;
            let old_x_str;
            combo.callback = () => {
                if (combo_current != combo.value)  {
                    old_x = this.widgets[1]?.value || old_x;
                    old_y = this.widgets[2]?.value || old_y;
                    old_z = this.widgets[3]?.value || old_z;
                    old_w = this.widgets[4]?.value || old_w;

                    if (combo_current == 'BOOLEAN') {
                        old_x_bool = this.widgets[1]?.value || old_x_bool;
                    //} else if (combo_current == 'INT') {
                    //    old_x = this.widgets[1]?.value || old_x;
                    } else if (combo_current == 'STRING') {
                        old_x_str = this.widgets[1]?.value || old_x_str;
                    }

                    // remember the connections and attempt to re-connect
                    let old_connect = [];
                    if (this.outputs && this.outputs.length > 0) {
                        const old = this.outputs[0].links ? this.outputs[0].links.map(x => x) : [];
                        for (const id of old) {
                            var link = this.graph.links[id];
                            if (!link) {
                                continue;
                            }
                            var node = this.graph.getNodeById(link.target_id);
                            if (node) {
                                old_connect.push({
                                    node: node,
                                    slot: link.target_slot,
                                })
                            }
                        }
                        this.removeOutput(0);
                    }

                    while ((this.widgets || [])[1]) {
                        widget_remove(this, 1);
                    }

                    if (combo.value == 'BOOLEAN') {
                        ComfyWidgets[combo.value](this, '🇽', [combo.value, {"default": old_x_bool}], app)
                    } else if (combo.value == 'INT') {
                        ComfyWidgets[combo.value](this, '🇽', [combo.value, {"default": old_x, "step": 1}], app)
                    } else if (combo.value == 'FLOAT') {
                        ComfyWidgets[combo.value](this, '🇽', [combo.value, {"default": old_x, "step": 0.01}], app)
                    } else if (combo.value == 'STRING') {
                        ComfyWidgets[combo.value](this, '🇽', [combo.value, {"default": old_x_str, "multiline": true, "dynamicPrompts": false}], app)
                    } else {
                        ComfyWidgets.FLOAT(this, '🇽', ["FLOAT", {"default": old_x, "step": 0.01}], app)
                        if (combo.value === "VEC2") {
                            ComfyWidgets.FLOAT(this, '🇾', ["FLOAT", {"default": old_y, "step": 0.01}], app)
                        }
                        else if (combo.value === "VEC3") {
                            ComfyWidgets.FLOAT(this, '🇾', ["FLOAT", {"default": old_y, "step": 0.01}], app)
                            ComfyWidgets.FLOAT(this, '🇿', ["FLOAT", {"default": old_z, "step": 0.01}], app)
                        }
                        else if (combo.value === "VEC4") {
                            ComfyWidgets.FLOAT(this, '🇾', ["FLOAT", {"default": old_y, "step": 0.01}], app)
                            ComfyWidgets.FLOAT(this, '🇿', ["FLOAT", {"default": old_z, "step": 0.01}], app)
                            ComfyWidgets.FLOAT(this, '🇼', ["FLOAT", {"default": old_w, "step": 0.01}], app)
                        }
                    }

                    const my_map = {
                        STRING: "📝",
                        BOOLEAN: "🇴",
                        INT: "🔟",
                        FLOAT: "🛟",
                        VEC2: "🇽🇾",
                        VEC3: "🇽🇾\u200c🇿",
                        VEC4: "🇽🇾\u200c🇿\u200c🇼",
                    }
                    let val = combo.value;
                    this.addOutput(my_map[val], val, { shape: LiteGraph.CIRCLE_SHAPE });

                    // reconnect if it had one
                    for (const conn of old_connect) {
                        this.connect(0, conn.node, conn.slot);
                    }
                    combo_current = combo.value;
                }
                fitHeight(self);
            }
            setTimeout(() => { combo.callback(); }, 15);
            return me;
        }
	}
}

app.registerExtension(ext)

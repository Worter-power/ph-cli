export default {
    data() {
        return {
            fantoryDatas: []
        }
    },
    methods: {
        _initTreeDatas(arr, props = { children: 'children', label: 'name', key: 'id'}) {
            arr.forEach((_r) => {
                if (this.$_.find(arr, { [props.children]: _r[props.key] })) {
                    _r.leaf = false;
                } else {
                    _r.leaf = true;
                }
            });
            this.fantoryDatas = arr;
            return this._getChildItem(null);
        },
        _renderTree(h, { node, data }) {
            return (
                <span class="rc_seache_treeitem">
                    <i class={{ fa: true, 'fa-file-text-o': data.leaf, 'fa-folder-o': !data.leaf && !node.expanded, 'fa-folder-open-o': !data.leaf && node.expanded }}></i>
                    <span>{data.name}</span>
                    <span style={{ 'display': data.count ? 'inline' : 'inline' }}>( {data.count || 0} )</span>
                </span>
            )
        },
        _handleloadNode(node, resolve) {
            resolve(this._getChildItem(node.data.id))
        },
        _getChildItem(id) {
            let arr = [];
            this.fantoryDatas.forEach((_r) => {
                if (_r.parentId == id) {
                    _r.children = [];
                    arr.push(_r);
                }
            });
            return arr
        }
    }
}
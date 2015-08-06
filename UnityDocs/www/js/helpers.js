$.fn.extend({
    exists: function () {
        return !(this.length == 0);
    },
    serializeObject: function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
});

var elements = {
    emptyFolder: "<li>This folder is empty.</li>",
    emptyLibrary: "<li>This library is empty.</li>",

};
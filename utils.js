if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function localStorageSafeGet(store_name,default_val){
  let value = localStorage.getItem(store_name);
  if(value == null){
    return default_val;
  }
  else{
    return value;
  }
}

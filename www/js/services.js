angular.module('app.services', [])

.factory('Category', function()
{
  var categories;
  
  return{
	
	getAt:function(at)
	{
		var list = [];
		//	Just for mockup we need to get json in response of specific id
		for (var i = 0; i < categories.length; i++)
		{
			if (categories[i].parentId === parseInt(at))
			{
			  list.push(categories[i]);
			}
		}
		return list;
	},
    getAll: function()
	{
		return categories;
    },
	set: function(value)
	{
		categories = value;
    }
  };
})

.factory('Course', function()
{
  var courses;
  
  return{
	getRec: function(ids)
	{
		//	Just for mockup we need to get json in response of specific ids
		var list = [];
		for (var i=0; i<courses.length; i++)
		{
			for (id in ids)
			{
				if (courses[i].parentId === parseInt(id))
				{
					list.push(courses[i]);
				}
			}
		}
		return list;
    },
	getFav: function(ids)
	{
		//	Just for mockup we need to get json in response of specific ids
		var list = [];
		for (var i=0; i<courses.length; i++)
		{
			for (id in ids)
			{
				if (courses[i].cid === parseInt(id))
				{
					list.push(courses[i]);
				}
			}
		}
		return list;
    },
	getEnr: function(ids)
	{
		//	Just for mockup we need to get json in response of specific ids
		var list = [];
		for (var i=0; i<courses.length; i++)
		{
			for (id in ids)
			{
				if (courses[i].cid === parseInt(id))
				{
					list.push(courses[i]);
				}
			}
		}
		return list;
    },
	getDetail:function(cid)
	{
		//	Just for mockup we need to get json in response of specific id
		for (var i = 0; i < courses.length; i++)
		{
			if (courses[i].cid === parseInt(cid))
			{
			  return courses[i];
			}
		}
		return null;
	},
	getAt:function(at)
	{
		var list = [];
		//	Just for mockup we need to get json in response of specific id
		for (var i = 0; i < courses.length; i++)
		{
			if (courses[i].parentId === parseInt(at))
			{
			  list.push(courses[i]);
			}
		}
		return list;
	},
    getAll: function()
	{
		return courses;
    },
	set: function(value)
	{
		courses = value;
    }
  };
})

.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});
	// Search inside tag 'search-included'
	var container = document.querySelector('[data-ref="search-included"]');
	
	var btnAll = document.querySelector('[data-ref="input-all"]');
	var btnThemePerception = document.querySelector('[data-ref="input-theme-perception"]');
	var btnThemeVRAR = document.querySelector('[data-ref="input-theme-vr-ar"]');
	var btnThemeFabrication = document.querySelector('[data-ref="input-theme-fabrication"]');
	
    var keyupTimeout;

    var mixer = mixitup(container, 
	{
		animation: 
		{
			duration: 350
		},
		
		callbacks: 
		{
			onMixClick: function() 
			{
				// Reset the search if a filter is clicked
				if (this.matches('[data-filter]')) 
				{
					inputSearch.value = '';
				}
			}
		}
	});

	// Set up a handler to listen for "click" events from the search input
	btnAll.addEventListener('click', function() 
	{
		mixer.filter('all');
	});
	
	btnThemePerception.addEventListener('click', function() 
	{
		mixer.filter('[class*=perception]');
	});
	
	btnThemeVRAR.addEventListener('click', function() 
	{
		mixer.filter('[class*=vrar]');
	});
	
	btnThemeFabrication.addEventListener('click', function() 
	{
		mixer.filter('[class*=fabrication]');
	});

	function filterByString(searchValue) 
	{
		if (searchValue) 
		{
			// Use an attribute wildcard selector to check for matches
			mixer.filter('[class*="' + searchValue + '"]');
		} 
		else 
		{
			// If no searchValue, treat as filter('all')
			mixer.filter('all');
		}
	}
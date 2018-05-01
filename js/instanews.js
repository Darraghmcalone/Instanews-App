$(function() {

    var nytData,
        nytItems,
        $loader = $('.ajax-loader'),
        $articles = $('.articles')

    //Hide Ajax loader
    $(document).ready(function() {

        $loader.hide();
        //Prevent Default
        $('.drop-down').on('change', function(event) {
            event.preventDefault();

            //Empty the vars
            $articles.empty();
            nytData, nytItems = '';

            //Enpoint
            var url = 'https://api.nytimes.com/svc/topstories/v2/';
            var value = $(this).val();
            url += value + ('.json');

            url += '?' + $.param({
                'api-key': '44941702545b4aedab761ccd7fa9a743'
            });

            // AJAX CALL TO GET THE ARTICLES

            $.ajax({
                    url: url,
                    method: 'GET',
                    datatype: JSON
                }).done(function(data) {
                    //console.log(data.results)[21].multimedia[4].url;
                    //Create Articles
                    console.log(data.results);
                    if (data.length !== 0) {
                        nytItems += '<ul>';
                        $.each(data.results, function(key, value) {

                            var articleImageUrl = value.multimedia[4].url;
                            //if else
                            var articleCaption = value.abstract;
                            var articleLink = value.url;
                            if(key<12){


                            nytItems += '<li class=article-item>';
                            nytItems += '<a href=#"' + articleLink + '"target="_blank">';

                            nytItems += '<div class="inner-item-wrapper">';
                            nytItems += '<div class="article" style="background-image:url(' + articleImageUrl + ')">';

                            nytItems += '<div class="story-meta">';
                            nytItems += '<p>' +
                                (articleCaption || 'This story has no description.') + '</p>';

                            nytItems += '</li>';
                            nytItems += '</a>';
                            nytItems += '</div>';
                            nytItems += '</div>';
                            nytItems += '</div>';
                        };
                        });
                        nytItems += '</ul>';



                    } else {
                        nytItems += '<p class="feedback">Sorry!</p>';
                    }
$articles.empty().append(nytItems);
                })
                .fail(function() {})

        });
    });

});

$(function () {
  $("#header").load("topHeader.html");
  $("#footer").load("footer.html");
});
//  var para_product_id = '';
$(document).ready(function () {
  $('#breadCrum').show();
  var details = [];
  var related_products = [];
  var _cat_name = "";
  var _sub_cat_name = "";

  var queryString = window.location.search;
  console.log("queryString---", queryString);
  const product_detail_param = new URLSearchParams(queryString);
  console.log("product_detail_param---------", product_detail_param);

  var para_product_id = product_detail_param.get("product_id");
  console.log("para_product_id-------", para_product_id);
  Product_data.forEach(function (value, index) {
    if (value.product_id == para_product_id) {
      details.push(value);
    }
  });
  console.log(details);
  var para_sub_cat_id = details[0].sub_cat_id;
  console.log("para_sub_cat_id", para_sub_cat_id);
  Product_data.forEach(function (value, index) {
    if (value.sub_cat_id == para_sub_cat_id) {
      related_products.push(value);
      $(".related_products_carousel").append(
        `<div class="swiper-slide">
      <div class="container" >
        <div class="card m-0" >
        <a href="detailsPage.html?product_id=${value.product_id}" style="text-decoration:none;">
          <img class="card-img-top" style="max-width: 100%;margin-left: auto; margin-right: auto;" src="${value.product_img}" alt="Card image" style="width:100%">
          <div class="card-body pt-0 pb-0">
            <p class="card-text mb-0">
            <p class="card-product-name mb-0">${value.product_name}</p>
            <p class="mb-0">
            <p style="font-size:18px;color:black;">&nbsp ₹${value.product_discount_price} </p>
             <span class="color-secondary"><del>₹${value.product_price} </del> &nbsp (${value.product_discount_percenteage}% off)</span>
             </p>
            </p>
            
          </div>
          </a>
        </div>
      </div>
    </div>`
      );
    }
  });

  console.log("related_products--------", related_products);

  console.log("product_details--------", details);

  // $('#productRoute').text(``);

  $("#Product-image-main").attr("src", `${details[0].product_img}`);

  $(".img-set").attr("src", `${details[0].product_img}`);

  $("#productName").text(`${details[0].product_name}`);

  $("#product_rating_count").html(`${details[0].product_rating_count} ratings`);

  $('#rating').html(`<i class="fa-solid fa-star" style="font-size: 13px;color:#f5961d ;text-align:center;"></i>
                    <i class="fa-solid fa-star" style="font-size: 13px;color:#f5961d;text-align:center;"></i>
                    <i class="fa-solid fa-star" style="font-size: 13px;color:#f5961d;text-align:center;"></i>
                    <i class="fa-solid fa-star" style="font-size: 13px;color:#f5961d;text-align:center;"></i>
                    <i class="fa-regular fa-star"style="font-size: 13px;text-align:center;"></i>`
  ); 

  $("#discount").html(`-${details[0].product_discount_percenteage}% &nbsp `);

  $(".price").html(
    `<p id="currency">₹${details[0].product_discount_price}</p>`
  );

  $("#mrp").html(`M.R.P.: <s>&#8377 ${details[0].product_price}</s>`);

  $("#color-name").html(`<b>Color Name :</b>  ${details[0].product_color}`);
  var color= (details[0].product_color).toLowerCase();
  $('.color-bubble').css("background-color",color);

  $("#product_description").html(
    `<br><b>Description :</b> <br>  ${details[0].product_description}`
  );

  $("#productDetailsSectionList").html(`<li> 
        <span  class="big-bold-fonts">
          Product Name :
        </span>
        ${details[0].product_name}
      </li>
      <li> 
        <span  class="big-bold-fonts">
          Rating :
        </span>
        ${details[0].product_rating}
      </li>
      <li> 
        <span  class="big-bold-fonts">
          Discount :
        </span>
        ${details[0].product_discount_percenteage}%
      </li>
      <li> 
        <span  class="big-bold-fonts">
          Color :
        </span>
        ${details[0].product_color}
      </li>
      <li> 
        <span  class="big-bold-fonts">
          Size :
        </span>
        ${details[0].product_size}
      </li>`);

  $("#product-description-section").html(`${details[0].product_description}`);
  $('#customer-review-stars').html(`<i class="fa-solid fa-star" style="font-size: 18px;color:#f5961d"></i>
                                <i class="fa-solid fa-star" style="font-size: 18px;color:#f5961d"></i>
                                <i class="fa-solid fa-star" style="font-size: 18px;color:#f5961d"></i>
                                <i class="fa-solid fa-star" style="font-size: 18px;color:#f5961d"></i>
                                <i class="fa-regular fa-star"style="font-size: 18px;"></i>`); 
  $('#customer-review').html(`${details[0].product_rating} out of 5`)
  $('#global-rating-count').html(`${details[0].product_rating_count}  global ratings`)

  category_data.forEach(function (v, i) {
    if (details[0].cat_id == v.cat_id) {
      _cat_name = v.cat_name;
    }
  });
  
 
  subcategory_data.forEach(function (v, i) {
    if (details[0].sub_cat_id == v.sub_cat_id) {
      _sub_cat_name = v.sub_cat_name;
    }
  });
 

  $("#productRoute").html(
    `<span class="_brod"><a href="index.html"><b>Home ></b> </a> </span>
    <span class="_brod"><a href="product-listing.html?cat_id=${details[0].cat_id}"><b>${_cat_name} ></b> </a> </span>
     <span class="_brod"><a href="product-listing.html?cat_id=${details[0].cat_id}&sub_cat_id=${details[0].sub_cat_id}"><b>${_sub_cat_name} ></b></a> </span>
     <span class="_brod"><a href="detailsPage.html?productname=${details[0].product_name}&des=${details[0].product_description}&product_id=${details[0].product_id}"><b>${details[0].product_name}</b></a> </span>
     `

  );

  // Add to cart functionality
  $("#addToCart").click(() => {
    var flag =0;
    var quantity = $("select#productQuantity option").filter(":selected").text();
    console.log('productQuantity----------', typeof(quantity));

    var addToCart_arr = localStorage.getItem('add_to_cart') || [];

    if(addToCart_arr != '') {
      addToCart_arr = JSON.parse(addToCart_arr);
    }

    addToCart_arr.forEach(function(value,index){
      if(value.product_id == para_product_id){
        value.quantity = parseInt(value.quantity) + parseInt(quantity);
      // console.log('value.quantity-----------',value.quantity);
       flag = 1;
      }
    })

    if(flag == 0 ){
      parseInt(quantity);
      var data_json = {
        "product_id": para_product_id,
        'quantity': parseInt(quantity),
        'product_name' : details[0].product_name,
        'product_description' : details[0].product_description,
        'product_img' : details[0].product_img,
        'product_price' : details[0].product_discount_price
      };
      addToCart_arr.push(data_json);
     
    }
    swal("Added to Cart", "", "success");
    setTimeout(function(){
      window.location.reload();
    },1000)
    
    localStorage.setItem('add_to_cart', JSON.stringify(addToCart_arr));
    
  });
  // Reviews section
  var reviews_arr = [];
  Product_data.forEach(function(value,index){
    if(value.product_id == para_product_id){
      reviews_arr.push(value.reviews); 
      value.reviews.forEach(function(value,index){
        $('#product-review-section').append(
          `<div class="jumbotron my-jumbotron">
          <p><span class="text-secondary font-italic">Reviewed on 13 June 2022 </span>&nbsp|&nbsp<span class="color-secondary">Verified Purchase</span> </p>
          <p>${value}</p>
          <button type="button" class="btn btn-light border" id="find-helpful" style="border-radius: 10px !important;">Helpful</button> &nbsp &nbsp| &nbsp <span class="text-secondary">Report abuse</span>
          
          </div><hr>`
        );
      })  
    }
  })
  
  $(document).on('click','#add-review', function (){
    $("#add-review").css('display','none');
    $("#add-review-div").append(
      `<div class="form-group orange-border-focus">
      <textarea class="form-control" id="review-input" rows="3"></textarea>
    </div>
    <button type="button" class="btn btn-block btn-light border" id="store-review-to-storage" style="border-radius: 10px !important;">Add Review</button>`
    );  
  })

  // Add Review in localstorage 
  $(document).on('click','#store-review-to-storage', function (){
    var review = $('#review-input').val();
    if(review == ''){
      swal("Please Add some review");
    }
    else{
      var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var date = new Date();
      var monthName = months[date.getMonth()]; // "July" (or current month)
      var current_date = `${date.getDate()} ${monthName} ${date.getFullYear()}`;
  
      var addReviews_arr = localStorage.getItem('add_reviews') || [];
      if(addReviews_arr != '') {
        addReviews_arr = JSON.parse(addReviews_arr);
        }
      var review_data={
        'product_id': para_product_id,
        'review' : review,
        'date' : current_date,
      }
      addReviews_arr.push(review_data);
  
      swal("Thank You", "Review has been recorded succesfully", "success");
      setTimeout(function(){
            window.location.reload();
          },1000)
  
          localStorage.setItem('add_reviews', JSON.stringify(addReviews_arr));
    }
  })

  // Prepend review in div

  var review_data = JSON.parse(localStorage.getItem('add_reviews'));
    if(review_data != null)
    {
        
      review_data.forEach(function(value,index){
        if(value.product_id == para_product_id){
          $('#product-review-section').prepend(
            `<div class="jumbotron my-jumbotron">
            <p><span class="text-secondary font-italic">Reviewed on ${value.date} </span>&nbsp|&nbsp<span class="color-secondary">Verified Purchase</span> </p>
            <p>${value.review}</p>
            <button type="button" class="btn btn-light border" id="find-helpful" style="border-radius: 10px !important;">Helpful</button> &nbsp &nbsp| &nbsp <span class="text-secondary">Report abuse</span>
            
            </div><hr>`
          );
        }
        
           
        })
    

    }

  
});





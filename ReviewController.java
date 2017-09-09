package com.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.model.Review;

@Controller
@RequestMapping(value = "/review")
public class ReviewController {

	@RequestMapping("/show-reviews")
	public String showReviews() {
		return "review";
	}

	@RequestMapping(value = "/submit-reviews", method = RequestMethod.POST)
	public String showReviews(HttpServletRequest request) {
		String returnValue = "review";
		int rvwCleaness = 0;
		int rvwService = 0;
		int rvwStaff = 0;
		int rvwLocation = 0;
		int rvwMoney = 0;
		int rvwFood = 0;
		
		String hotelId = "hotelID";//get from hidden field
		String userId = "userID";//get from hidden field
		
		String rvwComments = null;
		try {
			if (request.getParameter("cleaness") != null)
				rvwCleaness = Integer.parseInt(request.getParameter("cleaness"));
			if (request.getParameter("service") != null)
				rvwService = Integer.parseInt(request.getParameter("service"));
			if (request.getParameter("staff") != null)
				rvwStaff = Integer.parseInt(request.getParameter("staff"));
			if (request.getParameter("location") != null)
				rvwLocation = Integer.parseInt(request.getParameter("location"));
			if (request.getParameter("money") != null)
				rvwMoney = Integer.parseInt(request.getParameter("money"));
			if (request.getParameter("food") != null)
				rvwFood = Integer.parseInt(request.getParameter("food"));
			if (request.getParameter("comments") != null)
				rvwComments = request.getParameter("comments");
		} catch (NumberFormatException e) {
			e.printStackTrace();
			returnValue = "error";
		}
		
		
			

		System.out.println(rvwCleaness + "|" + rvwService + "|" + rvwStaff + "|" + rvwLocation + "|"
				+ rvwMoney + "|" + rvwFood+"|"+rvwComments);
		
		processReview(rvwCleaness,rvwService,rvwStaff,rvwLocation,rvwMoney,rvwFood,rvwComments,hotelId,userId);
		
		return returnValue;
	}

	private void processReview(int rvwCleaness, int rvwService, int rvwStaff, int rvwLocation, int rvwMoney,
			int rvwFood, String rvwComments, String hotelId, String userId) {
		Review review =new Review();
		
		Date rvwDate= new Date();
		String rvwState="PENDING";
		double rvwOverall =  (rvwCleaness+rvwService+rvwStaff+rvwLocation+rvwMoney+rvwFood)/6;
		
		review.setRvwDate(rvwDate);
		review.setHotelId(hotelId);
		review.setUserId(userId);
		review.setRvwCleaness(rvwCleaness);
		review.setRvwService(rvwService);
		review.setRvwStaff(rvwStaff);
		review.setRvwLocation(rvwLocation);
		review.setRvwMoney(rvwMoney);
		review.setRvwFood(rvwFood);
		review.setRvwOverall(rvwOverall);
		review.setRvwComments(rvwComments);
		review.setRvwState(rvwState);
		
		saveReview(review);
		notifiyAdminReview(review);
	}

	private void notifiyAdminReview(Review review) {
		// TODO save in database
		
	}

	private void saveReview(Review review) {
		// TODO Notify admin with pending statee
		
	}
	
	
	
}

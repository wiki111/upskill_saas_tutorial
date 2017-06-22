class ProfilesController < ApplicationController
    
    # GET to users/:user_id/profile/new 
    def new
       @profile = Profile.new
    end
    
    #POST request for creating an user profile
    def create
        
        # Ensure that we have the user who is filling out form
        @user = User.find( params[:user_id] )
        
        # Create profile likked to this specific user
        @profile = @user.build_profile(profile_params)
        
        if @profile.save
            flash[:success] = "Profile updated"
            redirect_to root_path
        else
            render action: :new
        end
        
    end
    
    private 
        def profile_params
            params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
        end
end
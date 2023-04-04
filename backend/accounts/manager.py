from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    # Use this manager in migrations
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        # Check if the email is provided
        if not email:
            raise ValueError('The given email must be set')
        # Normalize the email address by lowercasing the domain part of it
        email = self.normalize_email(email)
        # Create a new user object using the provided email and extra fields
        user = self.model(email=email, **extra_fields)
        # Set the user's password
        user.set_password(password)
        # Save the user object to the database
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, first_name=None, last_name=None, phone_number=None, **extra_fields):
        # Validate the required fields are set
        if not email:
            raise ValueError(('The Email must be set'))
        if not phone_number:
            raise ValueError(('The Phone Number must be set'))
        if not first_name:
            raise ValueError(('The First Name must be set'))
        if not last_name:
            raise ValueError(('The Last Name must be set'))

        # Normalize the email and names
        email = self.normalize_email(email)
        first_name = first_name.lower()
        last_name = last_name.lower()

        # Create and save the user with the provided information
        user = self.model(email=email, first_name=first_name, last_name=last_name, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        # Set the required fields for superusers
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        # Validate the required fields for superusers
        if extra_fields.get('is_staff') is not True:
            raise ValueError(('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(('Superuser must have is_superuser=True.'))

        # Create and return the superuser
        return self.create_user(email, password, **extra_fields)

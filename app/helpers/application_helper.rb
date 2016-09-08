module ApplicationHelper

  # Sets the body data-route value on a per-page basis
  # Params:
  # - class_names: String of class names to append to class names string
  def body_route
    self.controller_name + '_' + self.action_name
  end

  # Sets the body class on a per-page basis
  # Params:
  # - class_names: String of class names to append to class names string
  def body_class(class_names)
    class_name_str = body_route
    if !class_names.empty?
      class_name_str << ' ' + class_names
    end
    return class_name_str
  end

  def display_high_contrast_mode?
    controller.controller_name == 'dashboards' && controller.action_name == 'show'
  end
end

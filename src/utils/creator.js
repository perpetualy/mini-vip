import _ from 'underscore'

class Creator{

  objectsByName = [];

  setData(key, value){
    this[key] = value
  }

  svgIconOptionsFunction() {
    let _options = [];

    const STANDARD_SPRITE_IDS = "account,address,announcement,answer_best,answer_private,answer_public,approval,apps,apps_admin,article,asset_relationship,assigned_resource,avatar,avatar_loading,bot,business_hours,calibration,call,call_history,campaign,campaign_members,canvas,carousel,case,case_change_status,case_comment,case_email,case_log_a_call,case_milestone,case_transcript,client,cms,coaching,connected_apps,contact,contact_list,contract,contract_line_item,custom,custom_notification,dashboard,datadotcom,default,document,drafts,email,email_chatter,empty,endorsement,entitlement,entitlement_process,entitlement_template,entity,entity_milestone,environment_hub,event,feed,feedback,file,flow,folder,forecasts,generic_loading,goals,group_loading,groups,hierarchy,home,household,insights,investment_account,lead,lead_insights,lead_list,link,list_email,live_chat,location,log_a_call,macros,maintenance_asset,maintenance_plan,marketing_actions,merge,metrics,news,note,omni_supervisor,operating_hours,opportunity,opportunity_splits,orders,people,performance,person_account,photo,poll,portal,post,pricebook,process,product,product_consumed,product_item,product_item_transaction,product_request,product_request_line_item,product_required,product_transfer,question_best,question_feed,quick_text,quip,quip_sheet,quotes,recent,record,related_list,relationship,report,resource_absence,resource_capacity,resource_preference,resource_skill,reward,rtc_presence,sales_path,scan_card,service_appointment,service_contract,service_crew,service_crew_member,service_report,service_resource,service_territory,service_territory_location,service_territory_member,shipment,skill,skill_entity,skill_requirement,social,solution,sossession,task,task2,team_member,template,thanks,thanks_loading,timesheet,timesheet_entry,timeslot,today,topic,topic2,unmatched,user,work_order,work_order_item,work_type"

    const standard = STANDARD_SPRITE_IDS.split(",")

    _.forEach(standard, (svg) => {
        _options.push({value: svg, label: svg, icon: svg})
      }
    );
    return _options
  }

  objectsOptionsFunction(objects) {
    let _options = [];
    _.forEach(objects, (o, object_name) => {
        _options.push({label: (o.label || o.name), value: o.name, icon: o.icon})
      }
    );
    return _options
  }

  otherFunction(){

  }

  getNotesRelatedToReference(objects){
    let o = [];
    _.each(objects, function(object, object_name) {
      if (object.enable_notes) {
        return o.push(object_name);
      }
    });
    return o;
  }

  getTasksRelatedToReference(objects){
    let o = [];
    _.each(objects, function(object, object_name) {
      if (object.enable_tasks) {
        return o.push(object_name);
      }
    });
    return o;
  }

  getReferenceTo(str, objects){
    if(str.indexOf("object.enable_tasks") > -1){
      return this.getTasksRelatedToReference(objects)
    }else if(str.indexOf("object.enable_notes") > -1){
      return this.getNotesRelatedToReference(objects)
    }

    return []
  }

  stringToFunction(str) {
    if(str.indexOf('_.forEach(Creator.objectsByName') > -1 || str.indexOf('_.forEach(Creator.Objects') > -1){
      console.log('find function........................88888888888888888')
      return this.objectsOptionsFunction
    }else if(str.indexOf('Creator.resources.sldsIcons.standard') > -1){
      return this.svgIconOptionsFunction
    }else{
      console.error('stringToFunction转换失败，需要coding',str)
      return this.otherFunction
    }
  }

}
export default new Creator()